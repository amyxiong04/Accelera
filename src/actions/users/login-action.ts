'use server';

import { sql } from '@/lib/db';

export async function handleLogin(formData: FormData) {
  try {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      return { error: 'All fields are required.' };
    }

    console.log(email, password);

    await sql`SELECT * FROM users WHERE email = ${email.toString()} AND password = ${password.toString()}`;

    // Return success
    return { success: true };
  } catch (err) {
    console.error('Login error:', err);
    return { error: 'Failed to Login. Please try again.' };
  }
}
