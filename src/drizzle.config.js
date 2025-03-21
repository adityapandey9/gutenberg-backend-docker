import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: "./src/db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});