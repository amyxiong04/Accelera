'use server';

import { ServerActionResult } from '@/hooks/useServerAction';
import { sql } from '@/lib/db';
import { z } from 'zod';

// Define Zod schema for resource access validation
const ResourceAccessSchema = z.object({
  resource_id: z.coerce.number().positive('Resource ID is required'),
  startup_id: z.coerce.number().positive('Startup ID is required'),
  access_date: z.coerce.number().optional(),
  download_date: z.string().optional(),
});

// Type for parsed form data
export type ResourceAccessFormData = z.infer<typeof ResourceAccessSchema>;

// Type for successful response data
export type ResourceAccessData = {
  resource_id: number;
  startup_id: number;
  access_date?: number;
  download_date?: string;
};

// Return type that matches useServerAction expectations
export type ResourceAccessActionReturn = ResourceAccessData | null;

export async function handleResourceAccess(
  formData: FormData,
): Promise<ServerActionResult<ResourceAccessActionReturn>> {
  try {
    const resource_id = formData.get('resource_id');
    const startup_id = formData.get('startup_id');
    const access_date = formData.get('access_date');
    const download_date = formData.get('download_date');

    // Validate form data using Zod
    const result = ResourceAccessSchema.safeParse({
      resource_id: resource_id,
      startup_id: startup_id,
      access_date: access_date || null,
      download_date: download_date?.toString() || null,
    });

    if (!result.success) {
      const errorMessage = result.error.issues[0]?.message || 'Invalid form data';
      return { data: null, error: errorMessage };
    }

    const validatedData = result.data;

    // Check if resource exists
    const resourceExists =
      await sql`SELECT resource_id FROM resource WHERE resource_id = ${validatedData.resource_id}`;
    if (resourceExists.length === 0) {
      return { data: null, error: 'Resource not found' };
    }

    // Check if startup exists
    const startupExists =
      await sql`SELECT startup_id FROM startup WHERE startup_id = ${validatedData.startup_id}`;
    if (startupExists.length === 0) {
      return { data: null, error: 'Startup not found' };
    }

    // Insert or update the record in the accesses table
    await sql`
      INSERT INTO accesses (resource_id, startup_id, access_date, download_date)
      VALUES (
        ${validatedData.resource_id},
        ${validatedData.startup_id},
        ${validatedData.access_date ?? null},
        ${validatedData.download_date ?? null}
      )
      ON CONFLICT (resource_id, startup_id) 
      DO UPDATE SET
        access_date = ${validatedData.access_date ?? null},
        download_date = ${validatedData.download_date ?? null}
    `;

    // Return success
    return {
      data: {
        resource_id: validatedData.resource_id,
        startup_id: validatedData.startup_id,
        access_date: validatedData.access_date,
        download_date: validatedData.download_date,
      },
    };
  } catch (err) {
    console.error('Resource access error:', err);
    return { data: null, error: 'Failed to record resource access. Please try again.' };
  }
}
