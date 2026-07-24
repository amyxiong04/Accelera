import postgres from 'postgres';

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

// Postgres client instance
// This is a singleton instance, so it will be reused across the application.
export const sql = postgres(DB_URL, {
  ssl: DB_URL.includes('supabase.co') ? 'require' : undefined,
});
export default sql;
