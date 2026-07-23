'use server';

import { ServerActionResult } from '@/hooks/useServerAction';
import { sql } from '@/lib/db';

export type DivisionEventData = {
  name: string;
}[];

export async function getStartupAllEvents(): Promise<ServerActionResult<DivisionEventData>> {
  try {
    const result: DivisionEventData = await sql`
      SELECT s.name 
      FROM startup s
      WHERE NOT EXISTS ((SELECT e.event_id FROM event e) 
                         EXCEPT 
                         SELECT a.event_id FROM attends a WHERE s.startup_id = a.startup_id)
    `;

    return {
      data: result,
    };
  } catch {
    return {
      data: null,
      error: 'Failed to find startup.',
    };
  }
}
