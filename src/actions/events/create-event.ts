'use server';

import { ServerActionResult } from '@/hooks/useServerAction';
import { sql } from '@/lib/db';
import { z } from 'zod';

// Define Zod schema for event validation
const EventFormSchema = z.object({
  name: z.string().min(1, 'Event name is required'),
  event_type: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
});

// Type for parsed form data
export type EventFormData = z.infer<typeof EventFormSchema>;

// Type for successful response data
export type EventData = {
  event_id: number;
  name: string;
  event_type?: string;
  location?: string;
  description: string;
};

// Return type that matches useServerAction expectations
export type CreateEventActionReturn = EventData | null;

export async function createEvent(
  formData: FormData,
): Promise<ServerActionResult<CreateEventActionReturn>> {
  try {
    const name = formData.get('name');
    const event_type = formData.get('event_type');
    const location = formData.get('location');
    const description = formData.get('description');

    // Validate form data using Zod
    const result = EventFormSchema.safeParse({
      name: name?.toString() || '',
      event_type: event_type?.toString() || undefined,
      location: location?.toString() || undefined,
      description: description?.toString() || '',
    });

    if (!result.success) {
      const errorMessage = result.error.issues[0]?.message || 'Invalid form data';
      return { data: null, error: errorMessage };
    }

    const validatedData = result.data;

    // Insert the new event into the database
    const dbResult = await sql`
      INSERT INTO event (name, event_type, description, location)
      VALUES (
        ${validatedData.name},
        ${validatedData.event_type || null},
        ${validatedData.description || null},
        ${validatedData.location || null}
      )
      RETURNING event_id, name, event_type, location, description
    `;

    if (dbResult.length === 0) {
      return { data: null, error: 'Failed to create event' };
    }

    // Return success with the created event data
    return {
      data: {
        event_id: dbResult[0].event_id,
        name: dbResult[0].name,
        event_type: dbResult[0].event_type,
        location: dbResult[0].location,
        description: dbResult[0].description,
      },
    };
  } catch (err) {
    console.error('Create event error:', err);
    return { data: null, error: 'Failed to create event. Please try again.' };
  }
}
