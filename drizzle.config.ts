import dotenv from "dotenv";
import type { Config } from "drizzle-kit";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env.local") });

if (!process.env.DATABASE_URL)
  throw new Error("DATABASE_URL not found in environment");

export default {
  schema: "./db/schema.ts",
  out: "./db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  strict: true,
} satisfies Config;
