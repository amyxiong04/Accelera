'use server';

import { ServerActionResult } from '@/hooks/useServerAction';
import { sql } from '@/lib/db';

type UpdateUserReturn = {
  success: boolean;
  message?: string;
};

export async function updateUser(
  formData: FormData,
): Promise<ServerActionResult<UpdateUserReturn>> {
  try {
    const oldEmail = formData.get('oldEmail')?.toString();
    const newEmail = formData.get('newEmail')?.toString();

    if (!oldEmail || !newEmail) {
      return {
        data: null,
        error: 'Failed to update email.',
      };
    }

    await sql`
      UPDATE users 
      SET email = ${newEmail} 
      WHERE email = ${oldEmail};
    `;

    return {
      data: { success: true, message: 'Email updated successfully.' },
    };
  } catch (err) {
    console.error('Update email error:', err);
    return {
      data: null,
      error: 'Failed to update email.',
    };
  }
}
