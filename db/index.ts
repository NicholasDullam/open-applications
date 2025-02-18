import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import ws from "ws";
import * as schema from "./schema";

const isDevelopment =
  !process.env.CI &&
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "development");

export const connectionString = isDevelopment
  ? "postgres://postgres:postgres@db.localtest.me:5432/main"
  : process.env.DATABASE_URL;

if (isDevelopment && connectionString) {
  neonConfig.fetchEndpoint = (host) => {
    const [protocol, port] =
      host === "db.localtest.me" ? ["http", 4444] : ["https", 443];
    return `${protocol}://${host}:${port}/sql`;
  };
  const connectionStringUrl = new URL(connectionString);
  neonConfig.useSecureWebSocket =
    connectionStringUrl.hostname !== "db.localtest.me";
  neonConfig.wsProxy = (host) =>
    host === "db.localtest.me" ? `${host}:4444/v2` : `${host}/v2`;
}
neonConfig.webSocketConstructor = ws;

if (!connectionString) throw new Error("DATABASE_URL not found in environment");

const sql = neon(connectionString);
export const db = drizzle({
  client: sql,
  schema,
});
