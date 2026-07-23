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
      WITH startup_accesses AS (
        SELECT 
          s.startup_id, 
          s.name, 
          COUNT(a.resource_id) AS access_count,
          RANK() OVER (ORDER BY COUNT(a.resource_id) DESC) AS access_rank
        FROM 
          startup s
          JOIN accesses a ON s.startup_id = a.startup_id
        GROUP BY 
          s.startup_id, s.name
      )
      SELECT 
        startup_id, 
        name, 
        access_count
      FROM 
        startup_accesses
      WHERE 
        access_rank <= 5  -- Get top 5 startups with most accesses
      ORDER BY 
        access_count DESC;
    `;

    return { data: result };
  } catch (err) {
    console.error('Nested aggregation error:', err);
    return { data: null, error: 'Failed to fetch startup data.' };
  }
}
