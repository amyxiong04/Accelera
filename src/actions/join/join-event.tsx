'use server';

import { ServerActionResult } from '@/hooks/useServerAction';
import { sql } from '@/lib/db';

export type JoinEventsData = {
  name: string;
}[];

export async function handleJoin(formData: FormData): Promise<ServerActionResult<JoinEventsData>> {
  try {
    const eventName = formData.get('eventName')?.toString();

    if (!eventName) {
      return {
        data: null,
        error: 'Failed to find event.',
      };
    }

    const result: JoinEventsData = await sql`
      SELECT s.name 
      FROM event e, attends a, startup s
      WHERE  s.startup_id = a.startup_id AND a.event_id = e.event_id AND e.name = ${eventName}
    `;

    return {
      data: result,
    };
  } catch (err) {
    console.error('Update email error:', err);
    return {
      data: null,
      error: 'Failed to find event.',
    };
  }
}
