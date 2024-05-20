import { env } from "bun";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

console.log(' ------------------------------------------- ');
console.log('Starting migration .....');
console.log('URL: ');
console.log(process.env.DATABASE_URL);
console.log(' ------------------------------------------- ');
const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });
await migrate(drizzle(migrationClient), { migrationsFolder: './drizzle' })
console.log('Migration completed')
await migrationClient.end()
