'use server';

import { sql } from '@/lib/db';

export async function handleSignup(formData: FormData) {
  try {
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');

    if (!email || !password || !name) {
      return { error: 'All fields are required.' };
    }

    await sql`INSERT INTO users (email, password, name) VALUES (${email.toString()}, ${password.toString()}, ${name.toString()})`;

    // Return success
    return { success: true };
  } catch (err) {
    console.error('Signup error:', err);
    return { error: 'Failed to create account. Please try again.' };
  }
}
