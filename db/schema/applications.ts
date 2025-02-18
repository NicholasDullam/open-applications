import { pgTable, text, unique, uuid } from "drizzle-orm/pg-core";
import { users } from "../schema";
import { timestamps } from "./timestamps";

export const applications = pgTable(
  "applications",
  {
    id: uuid().primaryKey().defaultRandom().notNull(),
    userId: uuid()
      .references(() => users.id)
      .notNull(),
    status: text().notNull(),
    companyName: text().notNull(),
    jobTitle: text().notNull(),
    jobUrl: text().notNull(),
    ...timestamps,
  },
  (t) => [unique().on(t.jobUrl, t.userId)],
);
