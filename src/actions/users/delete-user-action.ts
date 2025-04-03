'use server';

import { ServerActionResult } from '@/hooks/useServerAction';
import { sql } from '@/lib/db';

type DeleteUserReturn = {
  success: boolean;
  message?: string;
};

export async function deleteUserAction(
  formData: FormData,
): Promise<ServerActionResult<DeleteUserReturn>> {
  try {
    const email = formData.get('email')?.toString();

    if (!email) {
      return {
        data: null,
        error: 'Failed to delete user.',
      };
    }

    await sql`DELETE FROM users WHERE email = ${email}`;

    return {
      data: { success: true, message: 'User deleted successfully!' },
    };
  } catch (err) {
    console.error('Delete user error:', err);
    return {
      data: null,
      error: 'Failed to delete user. Please try again.',
    };
  }
}
