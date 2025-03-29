'use server';

import { sql } from '@/lib/db';
import { ServerActionResult } from '@/hooks/useServerAction';
import { z } from 'zod';

const FilterEventsSchema = z.object({
  event_type: z.string().optional(),
  location: z.string().optional(),
});

// Type for parsed form data
export type FilterEventsFormData = z.infer<typeof FilterEventsSchema>;

export type FilterEventsData = {
  event_id: number;
  name: string;
  event_type: string;
  location: string;
  date: string;
}[];

// Main server action
export async function filterEvents(
  formData: FormData,
): Promise<ServerActionResult<FilterEventsData>> {
  try {
    const event_type = formData.get('event_type')?.toString() || '';
    const location = formData.get('location')?.toString() || '';

    // Validate input using Zod
    const result = FilterEventsSchema.safeParse({ event_type, location });

    if (!result.success) {
      const errorMessage = result.error.issues[0]?.message || 'Invalid form data';
      return { data: null, error: errorMessage };
    }

    const conditions: string[] = [];
    const values: string[] = [];

    if (event_type) {
      conditions.push(`event_type = $${values.length + 1}`);
      values.push(event_type);
    }

    if (location) {
      conditions.push(`location = $${values.length + 1}`);
      values.push(location);
    }

    let query = 'SELECT * FROM Event';

    if (conditions.length > 0) {
      const whereClause = conditions.join(' AND ');
      query += ` WHERE ${whereClause}`;
    }
    
    query += ';';
    
    const events: FilterEventsData = await sql.unsafe(query, values);

    return { data: events };
  } catch (err) {
    console.error('Filter events error:', err);
    return { data: null, error: 'Failed to fetch events.' };
  }
}
