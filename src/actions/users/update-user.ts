'use server';

import { sql } from '@/lib/db';

export async function updateUser(formData: FormData) {
  try {
    const oldEmail = formData.get('oldEmail')?.toString();
    const newEmail = formData.get('newEmail')?.toString();

    if (!oldEmail || !newEmail) {
      return { error: 'Both old and new emails required.' };
    }

    await sql`
      UPDATE users 
      SET email = ${newEmail} 
      WHERE email = ${oldEmail};
    `;

    return { success: true, message: 'Email updated successfully.' };
  } catch (err) {
    console.error('Update email error:', err);
    return { error: 'Failed to update email. Please try again.' };
  }
}

