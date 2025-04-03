'use server';

import { ServerActionResult } from '@/hooks/useServerAction';
import { sql } from '@/lib/db';

// Define the return type for the count data
export type UserCountsData = {
  events: number;
  resources: number;
  startups: number;
};

// Return type that matches useServerAction expectations
export type CountsActionReturn = UserCountsData | null;

/**
 * Server action to count the number of events, resources, and startups owned by a user
 * @param userId The ID of the user to count items for
 * @returns A promise containing counts of user-owned items or an error
 */
export async function countUserItems(
  userId: string,
): Promise<ServerActionResult<CountsActionReturn>> {
  try {
    if (!userId) {
      return { data: null, error: 'User ID is required' };
    }

    // Count events the user is related to
    // Using event table from EVENTS_TABLE_SCHEMA
    const eventsResult = await sql`
      SELECT COUNT(*) as count 
      FROM event 
     `;

    // Count resources the user has access to
    // Using resource table from RESOURCES_TABLE_SCHEMA
    const resourcesResult = await sql`
      SELECT COUNT(*) as count 
      FROM resource 
    `;

    // Count startups the user manages or founded
    // Using managed_by table from MANAGED_BY_TABLE_SCHEMA
    const startupsResult = await sql`
      SELECT COUNT(*) as count 
      FROM managed_by 
      WHERE user_id = ${userId}
    `;

    // Extract the counts from the query results
    const eventCount = parseInt(eventsResult[0]?.count || '0');
    const resourceCount = parseInt(resourcesResult[0]?.count || '0');
    const startupCount = parseInt(startupsResult[0]?.count || '0');

    // Return the counts
    return {
      data: {
        events: eventCount,
        resources: resourceCount,
        startups: startupCount,
      },
    };
  } catch (err) {
    console.error('Error counting user items:', err);
    return {
      data: null,
      error: 'Failed to count items. Please try again.',
    };
  }
}
