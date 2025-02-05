import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";

export const applications = pgTable(
  "applications",
  {
    id: text("id")
      .primaryKey()
      .notNull()
      .default(sql`gen_random_uuid()`),
    userId: text("userId").notNull(),
    status: text("status").notNull().default("pending"),
    companyName: text("companyName").notNull(),
    jobTitle: text("jobTitle").notNull(),
    jobUrl: text("jobUrl").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (t) => [unique().on(t.jobUrl)],
);

export const documents = pgTable(
  "documents",
  {
    id: text("id")
      .primaryKey()
      .notNull()
      .default(sql`gen_random_uuid()`),
    name: text("name").notNull(),
    type: text("type").notNull(),
    url: text("url").notNull(),
    userId: text("userId").notNull(),
    applicationId: text("applicationId").references(() => applications.id),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (t) => [unique().on(t.name, t.userId)],
);
