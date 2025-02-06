import { sql } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

export const timestamps = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp(),
};

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
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`)
      .notNull(),
    userId: text().notNull(),
    status: applicationStatus().notNull(),
    companyName: text().notNull(),
    jobTitle: text().notNull(),
    jobUrl: text().notNull(),
    ...timestamps,
  },
  (t) => [unique().on(t.jobUrl, t.userId)],
);

export const documents = pgTable(
  "documents",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`)
      .notNull(),
    name: text().notNull(),
    type: text().notNull(),
    url: text().notNull(),
    userId: text().notNull(),
    applicationId: uuid()
      .references(() => applications.id)
      .notNull(),
    ...timestamps,
  },
  (t) => [unique().on(t.name, t.userId)],
);
