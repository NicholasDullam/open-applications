import { env } from "@/env";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import ws from "ws";
import { applications, documents, users } from "./schema";

const isDevelopment = env.VERCEL_ENV !== "development";

const connectionString = isDevelopment
  ? env.DATABASE_URL
  : "postgres://postgres:postgres@db.localtest.me:5432/main";

if (isDevelopment) {
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
const sql = neon(connectionString);

export const db = drizzle(sql, {
  schema: { applications, documents, users },
});
