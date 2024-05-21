import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './server/db/schema/*',
  out: './drizzle',
  dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
