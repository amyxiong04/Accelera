'use server';

import { sql } from '@/lib/db';

import {
  USER_TABLE_SCHEMA,
  STARTUP_TABLE_SCHEMA,
  MANAGED_BY_TABLE_SCHEMA,
  JOB_POSTING_TABLE_SCHEMA,
  ACCESSES_TABLE_SCHEMA,
  RESOURCES_TABLE_SCHEMA,
  ACCELERATOR_TABLE_SCHEMA,
  ATTENDS_TABLE_SCHEMA,
  EVENTS_TABLE_SCHEMA,
  INVESTOR_TABLE_SCHEMA,
  INVESTOR_GROUP_TABLE_SCHEMA,
  BELONGS_TO_TABLE_SCHEMA,
  FUNDING_ROUND_TABLE_SCHEMA,
} from '@/db/schema';
import { DUMMY_DATA } from './dummy-data';

/**
 * Function to create the users table in the database.
 */
export const createSchema = async () => {
  try {
    await sql.unsafe(USER_TABLE_SCHEMA);
    console.log('Users table created successfully');

    await sql.unsafe(INVESTOR_TABLE_SCHEMA);
    console.log('Investors table created successfully');

    await sql.unsafe(INVESTOR_GROUP_TABLE_SCHEMA);
    console.log('InvestorGroup table created successfully');

    await sql.unsafe(BELONGS_TO_TABLE_SCHEMA);
    console.log('BelongsTo table created successfully');

    await sql.unsafe(ACCELERATOR_TABLE_SCHEMA);
    console.log('Accelerator table created successfully');

    await sql.unsafe(STARTUP_TABLE_SCHEMA);
    console.log('Startup table created successfully');

    await sql.unsafe(MANAGED_BY_TABLE_SCHEMA);
    console.log('ManagedBy table created successfully');

    await sql.unsafe(JOB_POSTING_TABLE_SCHEMA);
    console.log('JobPosting table created successfully');

    await sql.unsafe(RESOURCES_TABLE_SCHEMA);
    console.log('Resources table created successfully');

    await sql.unsafe(ACCESSES_TABLE_SCHEMA);
    console.log('Accesses table created successfully');

    await sql.unsafe(ATTENDS_TABLE_SCHEMA);
    console.log('Attends table created successfully');

    await sql.unsafe(EVENTS_TABLE_SCHEMA);
    console.log('Events table created successfully');

    await sql.unsafe(FUNDING_ROUND_TABLE_SCHEMA);
    console.log('Funding round table created successfully');

    console.log('Complete schema created successfully');

    await sql.unsafe(DUMMY_DATA);
    console.log('Dummy data inserted successfully');
  } catch (error) {
    console.error('Error creating user table:', error);
  }
};
