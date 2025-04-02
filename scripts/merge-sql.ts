import * as fs from 'fs';
import path from 'path';

// Import all schema constants from the current file
// In real usage, you'd import from your actual module
import {
  USER_TABLE_SCHEMA,
  INVESTOR_TABLE_SCHEMA,
  INVESTOR_GROUP_TABLE_SCHEMA,
  BELONGS_TO_TABLE_SCHEMA,
  STARTUP_TABLE_SCHEMA,
  MANAGED_BY_TABLE_SCHEMA,
  JOB_POSTING_TABLE_SCHEMA,
  RESOURCES_TABLE_SCHEMA,
  ACCESSES_TABLE_SCHEMA,
  ACCELERATOR_TABLE_SCHEMA,
  EVENTS_TABLE_SCHEMA,
  ATTENDS_TABLE_SCHEMA,
  EVENT_TABLE_SCHEMA,
} from '../src/db/schema';
import { DUMMY_DATA } from '@/db/dummy-data';

/**
 * Extracts the SQL statements from a schema string.
 * Removes any TypeScript template literal syntax and trims whitespace.
 */
function extractSqlFromSchema(schema: string): string {
  // Remove template literal backticks and trim whitespace
  return schema.replace(/^`|`$/g, '').trim();
}

/**
 * Merges all SQL schemas into a single SQL file.
 */
function mergeSchemas(): void {
  // Collect all schema variables
  const schemas = [
    USER_TABLE_SCHEMA,
    INVESTOR_TABLE_SCHEMA,
    INVESTOR_GROUP_TABLE_SCHEMA,
    BELONGS_TO_TABLE_SCHEMA,
    STARTUP_TABLE_SCHEMA,
    MANAGED_BY_TABLE_SCHEMA,
    JOB_POSTING_TABLE_SCHEMA,
    RESOURCES_TABLE_SCHEMA,
    ACCESSES_TABLE_SCHEMA,
    ACCELERATOR_TABLE_SCHEMA,
    EVENTS_TABLE_SCHEMA,
    ATTENDS_TABLE_SCHEMA,
    EVENT_TABLE_SCHEMA,
  ];

  // Extract SQL from each schema and join with newlines
  let mergedSql = schemas
    .map((schema) => extractSqlFromSchema(schema))
    .join('\n\n-- Next Table Schema --\n\n');

  mergedSql += `\n\n-- Dummy Data --\n\n${DUMMY_DATA}`;

  // Add header comment
  const finalSql = `-- Combined Database Schema\n-- Generated on: ${new Date().toISOString()}\n\n${mergedSql}`;

  // Use absolute path so that the directory is created relative to the script's location
  const sqlDir = path.resolve(__dirname, '../sql');
  if (!fs.existsSync(sqlDir)) {
    fs.mkdirSync(sqlDir, { recursive: true });
  }

  fs.writeFileSync(path.join(sqlDir, 'schema.sql'), finalSql, {
    encoding: 'utf-8',
    flag: 'w',
  });

  console.log('Successfully merged all schemas into schema.sql');
}

// Execute the function
mergeSchemas();
