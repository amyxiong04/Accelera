'use server';

import { ServerActionResult } from '@/hooks/useServerAction';
import { sql } from '@/lib/db';

// Define types for the resources data
export type ResourceData = {
  resource_id: number;
  name: string;
  description: string;
  link: string;
};

export type ResourcesActionReturn = ResourceData[] | null;

/**
 * Fetches all resources from the database
 */
export async function getResources(): Promise<ServerActionResult<ResourcesActionReturn>> {
  try {
    // Query the database for all resources
    const resources: ResourceData[] = await sql`
      SELECT resource_id, name, description, link
      FROM resource
      ORDER BY resource_id
    `;

    if (resources.length === 0) {
      return {
        data: [],
      };
    }

    return {
      data: resources,
    };
  } catch (err) {
    console.error('Error fetching resources:', err);
    return {
      data: null,
      error: 'Failed to fetch resources. Please try again.',
    };
  }
}

/**
 * Fetches resources accessed by a specific startup
 * @param startupId The ID of the startup
 */
export async function getStartupResources(
  startupId: number,
): Promise<ServerActionResult<ResourcesActionReturn>> {
  try {
    if (!startupId) {
      return {
        data: null,
        error: 'Startup ID is required',
      };
    }

    // Query the database for resources accessed by the specific startup
    const resources: ResourceData[] = await sql`
      SELECT r.resource_id, r.name, r.description, r.link
      FROM resource r
      JOIN accesses a ON r.resource_id = a.resource_id
      WHERE a.startup_id = ${startupId}
      ORDER BY r.resource_id
    `;

    if (resources.length === 0) {
      return {
        data: [],
      };
    }

    return {
      data: resources,
    };
  } catch (err) {
    console.error('Error fetching startup resources:', err);
    return {
      data: null,
      error: 'Failed to fetch resources for this startup. Please try again.',
    };
  }
}
