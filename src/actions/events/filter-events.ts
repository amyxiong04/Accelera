'use server';

import { sql } from '@/lib/db';
import { ServerActionResult } from '@/hooks/useServerAction';
import { z } from 'zod';

const FilterEventsSchema = z.object({
  event_type: z.string().optional(),
  location: z.string().optional(),
  attributes: z.array(z.string()).optional(),
});

export type FilterEventsFormData = z.infer<typeof FilterEventsSchema>;

export type FilterEventsData = Record<string, unknown>[];

export async function filterEvents(
  formData: FormData,
): Promise<ServerActionResult<FilterEventsData>> {
  try {
    const event_type = formData.get('event_type')?.toString() || '';
    const location = formData.get('location')?.toString() || '';
    const attributes = formData.getAll('attributes').map((attr) => attr.toString());

    const result = FilterEventsSchema.safeParse({ event_type, location, attributes });

    if (!result.success) {
      const errorMessage = result.error.issues[0]?.message || 'Invalid form data';
      return { data: null, error: errorMessage };
    }

    const conditions: string[] = [];
    const values: string[] = [];

    if (event_type) {
      conditions.push(`LOWER(event_type) LIKE LOWER($${values.length + 1})`);
      values.push(`%${event_type}%`);
    }

    if (location) {
      conditions.push(`LOWER(location) LIKE LOWER($${values.length + 1})`);
      values.push(`%${location}%`);
    }

    // Default selection if no attributes provided
    const selectedColumns =
      attributes.length > 0
        ? attributes.join(', ')
        : 'event_id, name, event_type, location, description';

    const query = `
      SELECT ${selectedColumns}
      FROM Event
      ${conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : ''}
      ;
    `;

    const events: FilterEventsData = await sql.unsafe(query, values);

    return { data: events };
  } catch (err) {
    console.error('Filter events error:', err);
    return { data: null, error: 'Failed to fetch events.' };
  }
}
