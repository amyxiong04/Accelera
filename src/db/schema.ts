/**
 * Schema for the users table.
 * This schema is used to create the users table in the database.
 */
export const USER_TABLE_SCHEMA = `
    CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    password VARCHAR(255) NOT NULL
    );
`;
