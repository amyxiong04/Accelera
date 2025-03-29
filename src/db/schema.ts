export type UserTableType = {
  user_id: number;
  email: string;
  name?: string;
  password: string;
};

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




export type EventTableType = {
  event_id: number;
  name: string;
  event_type?: string;
  location?: string;
  date?: string; 
};

export const EVENT_TABLE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS Event (
    event_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    event_type VARCHAR(100),
    location VARCHAR(100),
    date DATE NOT NULL
  );
`;
