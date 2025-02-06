import { sql } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";

export const applicationStatus = pgEnum("application_status", [
  "pending",
  "applied",
  "interviewing",
  "offer",
  "rejected",
]);

export const applications = pgTable(
  "applications",
  {
    id: text()
      .primaryKey()
      .notNull()
      .default(sql`gen_random_uuid()`),
    userId: text().notNull(),
    status: applicationStatus().notNull(),
    companyName: text().notNull(),
    jobTitle: text().notNull(),
    jobUrl: text().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
  },
  (t) => [unique().on(t.jobUrl, t.userId)],
);

export const documents = pgTable(
  "documents",
  {
    id: text()
      .primaryKey()
      .default(sql`gen_random_uuid()`)
      .notNull(),
    name: text().notNull(),
    type: text().notNull(),
    url: text().notNull(),
    userId: text().notNull(),
    applicationId: text()
      .references(() => applications.id)
      .notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
  },
  (t) => [unique().on(t.name, t.userId)],
);
