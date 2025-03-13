/**
 * Schema for the users table.
 * This schema is used to create the users table in the database.
 */
export const USER_TABLE_SCHEMA = `
    DROP TABLE IF EXISTS users CASCADE;

    CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    password VARCHAR(255) NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
`;
