'use server';

import { UserTableType } from '@/db/schema';
import { ServerActionResult } from '@/hooks/useServerAction';
import { sql } from '@/lib/db';
import { z } from 'zod';
import crypto from 'crypto';

// Function to hash passwords
function hashPassword(password: string): string {
  // Create a SHA-256 hash with a salt
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
  return `${salt}:${hash}`;
}

// Define Zod schema for signup validation
const SignupFormSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1, 'Name is required'),
});

// Type for parsed form data
export type SignupFormData = z.infer<typeof SignupFormSchema>;

// Type for successful response data
export type SignupData = {
  user: {
    id: UserTableType['user_id'];
    email: UserTableType['email'];
    name: UserTableType['name'];
  };
};

// Return type that matches useServerAction expectations
export type SignupActionReturn = SignupData | null;

export async function handleSignup(
  formData: FormData,
): Promise<ServerActionResult<SignupActionReturn>> {
  try {
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');

    // Validate form data using Zod
    const result = SignupFormSchema.safeParse({
      email: email?.toString() || '',
      password: password?.toString() || '',
      name: name?.toString() || '',
    });

    if (!result.success) {
      const errorMessage = result.error.issues[0]?.message || 'Invalid form data';
      return { data: null, error: errorMessage };
    }

    const validatedData = result.data;

    // Check if email already exists
    const existingUser = await sql`SELECT email FROM users WHERE email = ${validatedData.email}`;
    if (existingUser.length > 0) {
      return { data: null, error: 'Email is already registered' };
    }

    // Hash the password before storing it
    const hashedPassword = hashPassword(validatedData.password);

    // Insert user into database with hashed password
    const dbResult = await sql`
      INSERT INTO users (email, password, name) 
      VALUES (${validatedData.email}, ${hashedPassword}, ${validatedData.name})
      RETURNING user_id, email, name
    `;

    if (!dbResult.length) {
      return { data: null, error: 'Failed to create account' };
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
    console.error('Signup error:', err);
    return { data: null, error: 'Failed to create account. Please try again.' };
  }
}
