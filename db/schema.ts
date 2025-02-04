import { sql } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const Applications = pgTable("applications", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  userId: text("userId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  status: text("status").notNull().default("pending"),
  companyName: text("companyName").notNull(),
  jobTitle: text("jobTitle").notNull(),
  jobUrl: text("jobUrl").notNull(),
});

export const Documents = pgTable("documents", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  type: text("type").notNull(),
  url: text("url").notNull(),
  applicationId: text("applicationId").references(() => Applications.id),
});
