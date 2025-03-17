'use server';

import { sql } from '@/lib/db';

import { USER_TABLE_SCHEMA } from '@/db/schema';

/**
 * Function to create the users table in the database.
 */
export const createUserTable = async () => {
  try {
    await sql.unsafe(USER_TABLE_SCHEMA);
    console.log('User table created successfully');
  } catch (error) {
    console.error('Error creating user table:', error);
  }
};

export const createSchema = async () => {
  try {
    await createUserTable();
  } catch (error) {
    console.error('Error creating schema:', error);
  } finally {
    console.log('Schema creation process completed');
  }
};
