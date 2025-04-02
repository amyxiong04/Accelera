'use server';

import { ServerActionResult } from '@/hooks/useServerAction';
import { sql } from '@/lib/db';

export type GroupInvestorData = {
  name: string;
  count: number;
}[];

export async function handleGroupInvestor(
  formData: FormData,
): Promise<ServerActionResult<GroupInvestorData>> {
  try {
    const minimum = formData.get('minimum')?.toString();

    if (!minimum) {
      return {
        data: null,
        error: 'Failed to find event.',
      };
    }
    const result: GroupInvestorData = await sql`
      SELECT u.name, COUNT(*)
      FROM users u, investors i, funding_round f, startup s
      WHERE u.user_id = i.user_id AND i.user_id = f.user_id AND f.startup_id = s.startup_id
      GROUP BY u.name
      HAVING COUNT(*) >= ${minimum}
    `;

    return {
      data: result,
    };
  } catch (err) {
    console.error('Grouping error:', err);
    return {
      data: null,
      error: 'Failed to group investor group.',
    };
  }
}
