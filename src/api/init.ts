import { sql } from '@/lib/db';

import { USER_TABLE_SCHEMA } from '@/api/schema';

/**
 * Function to create the users table in the database.
 */
const createUserTable = async () => {
  try {
    await sql.unsafe(USER_TABLE_SCHEMA);
    console.log('User table created successfully');
  } catch (error) {
    console.error('Error creating user table:', error);
  }
};

// Run the function to create the tables
createUserTable()
  .then(() => {
    console.log('Database initialization completed successfully');
  })
  .catch((error) => {
    console.error('Error during database initialization:', error);
  })
  .finally(() => {
    sql.end();
  });
