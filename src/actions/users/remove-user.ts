'use server';

import { sql } from '@/lib/db';

export async function removeUser(formData: FormData) {
  try {
    const oldEmail = formData.get('oldEmail')?.toString();
    if (!oldEmail) {
      return { error: 'Email is required.' };
    }

    await sql`
      DELETE 
      FROM users 
      WHERE email = ${oldEmail};
    `;

    return { success: true, message: 'User deleted successfully.' };
  } catch (err) {
    console.error('Delete user error:', err);
    return { error: 'Failed to delete user. Please try again.' };
  }
}

