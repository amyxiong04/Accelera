'use server';

import { ServerActionResult } from '@/hooks/useServerAction';
import { sql } from '@/lib/db';

export type GroupCapitalData = {
  name: string;
  avg: number;
}[];

export async function handleGroup(): Promise<ServerActionResult<GroupCapitalData>> {
  try {
    const result: GroupCapitalData = await sql`
      SELECT ig.name, AVG(i.capital)
      FROM investors i, investor_group ig, belongs_to b
      WHERE i.user_id = b.user_id AND ig.invest_group_id = b.invest_group_id
      GROUP BY ig.name
      ORDER BY AVG(i.capital)
      DESC
    `;

    return {
      data: result,
    };
  } catch (err) {
    console.error('Grouping error.', err);
    return {
      data: null,
      error: 'Failed to group investor group.',
    };
  }
}
