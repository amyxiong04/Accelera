import { config } from 'dotenv';
import type { Sql } from 'postgres';

config({ path: '.env.local' });
config();

let db: Sql | undefined;

async function main() {
  const [{ createSchema }, { default: sql }] = await Promise.all([
    import('../src/db/init'),
    import('../src/lib/db'),
  ]);

  db = sql;
  await createSchema();
  await sql.end();
}

main().catch(async (error) => {
  console.error(error);
  await db?.end({ timeout: 5 }).catch(() => {});
  process.exit(1);
});
