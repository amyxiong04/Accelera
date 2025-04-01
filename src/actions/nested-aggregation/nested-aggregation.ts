'use server';

import { sql } from '@/lib/db';
import { ServerActionResult } from '@/hooks/useServerAction';

export type ResourceAccessResult = {
  startup_id: number;
  name: string;
  access_count: number;
};

export async function getStartupsWithMoreAccesses(): Promise<
  ServerActionResult<ResourceAccessResult[]>
> {
  try {
    const result = await sql<ResourceAccessResult[]>`
      SELECT s.startup_id, s.name, COUNT(a.resource_id) AS access_count
      FROM startup s, accesses a
      WHERE s.startup_id = a.startup_id
      GROUP BY s.startup_id, s.name
      HAVING COUNT(a.resource_id) > (
        SELECT AVG(total_accesses)
        FROM (
          SELECT COUNT(*) AS total_accesses
          FROM accesses
          GROUP BY startup_id
        ) AS access_counts
      );
    `;

    return { data: result };
  } catch (err) {
    console.error('Nested aggregation error:', err);
    return { data: null, error: 'Failed to fetch startup data.' };
  }
}
