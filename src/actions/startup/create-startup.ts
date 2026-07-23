'use server';

import { sql } from '@/lib/db';
import { z } from 'zod';

const CreateStartupSchema = z.object({
  name: z.string().min(1, 'Startup name is required'),
  description: z.string().optional(),
  pitchDeckUrl: z.string().url('Invalid URL format').optional().nullable(),
  stage: z.string().min(1, 'Stage is required'),
  foundedDate: z.string().min(1, 'Founded date is required'),
  role: z.string().min(1, 'Your role is required'),
});

export type CreateStartupFormData = z.infer<typeof CreateStartupSchema>;

export type CreateStartupData = {
  startup: {
    id: number;
    name: string;
  };
};

export type CreateStartupActionReturn = CreateStartupData | null;

export async function createStartup(formData: FormData) {
  try {
    const userIdValue = formData.get('userId');

    if (!userIdValue) {
      return {
        data: null,
        error: 'User ID is required to create a startup.',
      };
    }

    const userId = Number(userIdValue);

    if (isNaN(userId)) {
      return {
        data: null,
        error: 'Invalid user ID format.',
      };
    }

    const name = formData.get('name');
    const description = formData.get('description') || null;
    const pitchDeckUrl = formData.get('pitchDeckUrl') || null;
    const stage = formData.get('stage');
    const foundedDate = formData.get('foundedDate');
    const role = formData.get('role');

    const result = CreateStartupSchema.safeParse({
      name: name?.toString() || '',
      description: description?.toString() || '',
      pitchDeckUrl: pitchDeckUrl?.toString() || null,
      stage: stage?.toString() || '',
      foundedDate: foundedDate?.toString() || '',
      role: role?.toString() || '',
    });

    if (!result.success) {
      const errorMessage = result.error.issues[0]?.message || 'Invalid form data';
      return { data: null, error: errorMessage };
    }

    const validatedData = result.data;

    const newStartup = await sql.begin(async (sql) => {
      // Insert new startup
      const insertResult = await sql`
        INSERT INTO startup (name, description, pitch_deck_url, stage, founded_date)
        VALUES (
          ${validatedData.name},
          ${validatedData.description || null},
          ${validatedData.pitchDeckUrl || null},
          ${validatedData.stage},
          ${validatedData.foundedDate}
        )
        RETURNING startup_id, name;
      `;

      const startupId = insertResult[0].startup_id;
      const start_date = new Date().toISOString();

      // Create managed_by relationship - Fix: Use parameterized query instead of unsafe
      await sql`
        INSERT INTO managed_by (user_id, startup_id, role, start_date)
        VALUES (${userId}, ${startupId}, ${validatedData.role}, ${start_date});
      `;

      return insertResult[0];
    });

    return {
      data: {
        startup: {
          id: newStartup.startup_id,
          name: newStartup.name,
        },
      },
    };
  } catch (err) {
    console.error('Create startup error:', err);
    return { data: null, error: 'Failed to create startup. Please try again.' };
  }
}
