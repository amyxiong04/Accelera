'use server';

import { createSchema } from '@/db/init';

export type CreateSchemaActionReturn = {
  success: boolean;
};

export const createSchemaAction = async () => {
  try {
    await createSchema();

    return {
      data: { success: true },
    };
  } catch (error) {
    console.error('Error creating schema:', error);
    return { data: null, error: 'Failed to Login. Please try again.' };
  }
};
