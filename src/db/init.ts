'use server';

import { sql } from '@/lib/db';

import {
  ACCELERATOR_TABLE_SCHEMA,
  APPLIES_TABLE_SCHEMA,
  USER_TABLE_SCHEMA,
  INVESTOR_TABLE_SCHEMA,
  MENTOR_TABLE_SCHEMA,
  STARTUP_TABLE_SCHEMA,
  STARTUP_ATTRIBUTES_TABLE_SCHEMA,
  STARTUP_DETAILS_TABLE_SCHEMA,
  // BELONGS_TO_TABLE_SCHEMA,
  MANAGED_BY_TABLE_SCHEMA,
  FUNDING_ROUND_TABLE_SCHEMA,
  JOB_POSTING_TABLE_SCHEMA,
  ACCESSES_TABLE_SCHEMA,
  RESOURCE_TABLE_SCHEMA,
  ATTENDS_TABLE_SCHEMA,
  EVENT_TABLE_SCHEMA,
} from '@/db/schema';

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

/**
 * Function to create the resources table in the database.
 */
export const createResourceTable = async () => {
  try {
    await sql.unsafe(ACCELERATOR_TABLE_SCHEMA);
    await sql.unsafe(RESOURCE_TABLE_SCHEMA);
    await sql.unsafe(EVENT_TABLE_SCHEMA);

    await sql.unsafe(STARTUP_DETAILS_TABLE_SCHEMA);
    await sql.unsafe(STARTUP_ATTRIBUTES_TABLE_SCHEMA);
    await sql.unsafe(STARTUP_TABLE_SCHEMA);

    await sql.unsafe(APPLIES_TABLE_SCHEMA);
    await sql.unsafe(INVESTOR_TABLE_SCHEMA);
    await sql.unsafe(MENTOR_TABLE_SCHEMA);
    // await sql.unsafe(BELONGS_TO_TABLE_SCHEMA);
    await sql.unsafe(MANAGED_BY_TABLE_SCHEMA);
    await sql.unsafe(FUNDING_ROUND_TABLE_SCHEMA);
    await sql.unsafe(JOB_POSTING_TABLE_SCHEMA);
    await sql.unsafe(ACCESSES_TABLE_SCHEMA);
    await sql.unsafe(ATTENDS_TABLE_SCHEMA);
    console.log('Resource table created successfully');
  } catch (error) {
    console.error('Error creating resource table:', error);
  }
};

export const createSchema = async () => {
  try {
    await createUserTable();
    await createResourceTable();
  } catch (error) {
    console.error('Error creating schema:', error);
  } finally {
    console.log('Schema creation process completed');
  }
};
