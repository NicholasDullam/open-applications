import dotenv from "dotenv";
import type { Config } from "drizzle-kit";
import path from "path";
import { connectionString } from "./db";
dotenv.config({ path: path.resolve(__dirname, ".env.local") });

if (!connectionString) throw new Error("DATABASE_URL not found in environment");

export default {
  schema: "./db/schema",
  out: "./db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
} satisfies Config;
