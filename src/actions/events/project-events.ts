'use server';

import { sql } from '@/lib/db';
import { ServerActionResult } from '@/hooks/useServerAction';
import { z } from 'zod';

const ProjectionSchema = z.object({
  attributes: z.array(z.enum(['event_id', 'name', 'event_type', 'location', 'date'])).nonempty(),
});

export type ProjectionFormData = z.infer<typeof ProjectionSchema>;

export type ProjectionResult = Record<string, any>[];

export async function projectEvents(
  formData: FormData
): Promise<ServerActionResult<ProjectionResult>> {
  try {
    const attributes = formData.getAll('attributes').map(String);

    const parsed = ProjectionSchema.safeParse({ attributes });

    if (!parsed.success) {
      return { data: null, error: 'Invalid selection of attributes.' };
    }

    const selectedAttrs = parsed.data.attributes.join(', ');

    const results: ProjectionResult = await sql.unsafe(`SELECT ${selectedAttrs} FROM Event;`);

    return { data: results };
  } catch (err) {
    console.error('Projection error:', err);
    return { data: null, error: 'Failed to retrieve projection results.' };
  }
}
