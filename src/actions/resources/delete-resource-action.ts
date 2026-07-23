'use server';

import { ServerActionResult } from '@/hooks/useServerAction';
import { sql } from '@/lib/db';

/**
 * Deletes a resource from the database by its ID
 * @param params Object containing the resource ID to delete
 */
export async function deleteResource(
  resourceId: number | undefined,
): Promise<ServerActionResult<boolean>> {
  try {
    // Validate input
    if (!resourceId) {
      return {
        data: false,
        error: 'Resource ID is required',
      };
    }

    // Execute the delete query
    const result = await sql`
      DELETE FROM resource
      WHERE resource_id = ${resourceId}
      RETURNING resource_id
    `;

    // Check if a row was actually deleted
    if (result.length === 0) {
      return {
        data: false,
        error: 'Resource not found',
      };
    }

    return {
      data: true,
    };
  } catch (err) {
    console.error('Error deleting resource:', err);

    // Handle foreign key constraint violations separately
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    if (errorMessage.includes('foreign key constraint')) {
      return {
        data: false,
        error: 'Cannot delete this resource as it is being used by one or more startups',
      };
    }

    return {
      data: false,
      error: 'Failed to delete resource. Please try again.',
    };
  }
}
