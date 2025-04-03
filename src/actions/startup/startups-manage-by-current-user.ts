'use server';

import { ServerActionResult } from '@/hooks/useServerAction';
import { sql } from '@/lib/db';

type Startup = {
  startup_id: number;
  name: string;
  description: string | null;
  pitch_deck_url: string | null;
  stage: string;
  founded_date: string;
  role: string;
};

type FetchUserStartupsReturn = {
  startups: Startup[];
};

export async function fetchUserStartups(
  userId: number,
): Promise<ServerActionResult<FetchUserStartupsReturn>> {
  try {
    if (!userId) {
      return {
        data: null,
        error: 'User ID is required to fetch startups.',
      };
    }

    const startups = await sql<Startup[]>`
      SELECT s.startup_id, s.name, s.description, s.pitch_deck_url, s.stage, s.founded_date, mb.role
      FROM startup s
      JOIN managed_by mb ON s.startup_id = mb.startup_id
      WHERE mb.user_id = ${userId}
      ORDER BY s.name ASC;
    `;

    return {
      data: { startups },
    };
  } catch (err) {
    console.error('Fetch user startups error:', err);
    return {
      data: null,
      error: 'Failed to fetch startups. Please try again.',
    };
  }
}
