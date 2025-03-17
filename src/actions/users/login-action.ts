'use server';

import { UserTableType } from '@/db/schema';
import { ServerActionResult } from '@/hooks/useServerAction';
import { sql } from '@/lib/db';
import { z } from 'zod';
import crypto from 'crypto';

// Function to verify passwords
function verifyPassword(storedPassword: string, suppliedPassword: string): boolean {
  const [salt, storedHash] = storedPassword.split(':');
  const hash = crypto.pbkdf2Sync(suppliedPassword, salt, 1000, 64, 'sha256').toString('hex');
  return storedHash === hash;
}

// Define Zod schema for login validation
const LoginFormSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Type for parsed form data
export type LoginFormData = z.infer<typeof LoginFormSchema>;

// Type for successful response data
export type LoginData = {
  user: {
    id: UserTableType['user_id'];
    email: UserTableType['email'];
    name?: UserTableType['name'];
  };
  token?: string;
};

// Return type that matches useServerAction expectations
export type LoginActionReturn = LoginData | null;

export async function handleLogin(
  formData: FormData,
): Promise<ServerActionResult<LoginActionReturn>> {
  try {
    const email = formData.get('email');
    const password = formData.get('password');

    // Validate form data using Zod
    const result = LoginFormSchema.safeParse({
      email: email?.toString() || '',
      password: password?.toString() || '',
    });

    if (!result.success) {
      const errorMessage = result.error.issues[0]?.message || 'Invalid form data';
      return { data: null, error: errorMessage };
    }

    const validatedData = result.data;

    // Query the database by email only, retrieving the hashed password
    const dbResult =
      await sql`SELECT user_id, email, name, password FROM users WHERE email = ${validatedData.email}`;

    if (dbResult.length === 0) {
      return { data: null, error: 'Invalid email or password' };
    }

    // Verify the password
    const storedPassword = dbResult[0].password;
    const isPasswordValid = verifyPassword(storedPassword, validatedData.password);

    if (!isPasswordValid) {
      return { data: null, error: 'Invalid email or password' };
    }

    // Return success
    return {
      data: {
        user: {
          id: dbResult[0].user_id,
          email: dbResult[0].email,
          name: dbResult[0].name,
        },
      },
    };
  } catch (err) {
    console.error('Login error:', err);
    return { data: null, error: 'Failed to Login. Please try again.' };
  }
}
