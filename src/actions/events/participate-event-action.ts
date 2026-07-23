'use server';

import { ServerActionResult } from '@/hooks/useServerAction';
import { sql } from '@/lib/db';
import { z } from 'zod';

const EventParticipationSchema = z.object({
  event_id: z.coerce.number().positive('Event ID is required'),
  startup_id: z.coerce.number().positive('Startup ID is required'),
  registration_date: z.coerce.number().optional(),
});

export type EventParticipationFormData = z.infer<typeof EventParticipationSchema>;

export type EventParticipationData = {
  event_id: number;
  startup_id: number;
  registration_date?: number;
};

export type EventParticipationActionReturn = EventParticipationData | null;

export async function handleEventParticipation(
  formData: FormData,
): Promise<ServerActionResult<EventParticipationActionReturn>> {
  try {
    const event_id = formData.get('event_id');
    const startup_id = formData.get('startup_id');
    const registration_date = formData.get('registration_date');

    const result = EventParticipationSchema.safeParse({
      event_id: event_id,
      startup_id: startup_id,
      registration_date: registration_date || null,
    });

    if (!result.success) {
      return { data: null, error: result.error.issues[0]?.message || 'Invalid form data' };
    }

    const validatedData = result.data;

    // Insert or update participation record
    await sql`
      INSERT INTO attends (event_id, startup_id, registration_date)
      VALUES (
        ${validatedData.event_id},
        ${validatedData.startup_id},
        ${validatedData.registration_date ?? null}
      )
      ON CONFLICT (event_id, startup_id) 
      DO UPDATE SET
        registration_date = ${validatedData.registration_date ?? null}
    `;

    return {
      data: {
        event_id: validatedData.event_id,
        startup_id: validatedData.startup_id,
        registration_date: validatedData.registration_date,
      },
    };
  } catch (err) {
    console.error('Event participation error:', err);
    return { data: null, error: 'Failed to register for event. Please try again.' };
  }
}
