import { pgTable, text, unique, uuid } from "drizzle-orm/pg-core";
import { applications, users } from "../schema";
import { timestamps } from "./timestamps";

export const documents = pgTable(
  "documents",
  {
    id: uuid().primaryKey().defaultRandom().notNull(),
    name: text().notNull(),
    type: text().notNull(),
    url: text().notNull(),
    userId: uuid()
      .references(() => users.id)
      .notNull(),
    applicationId: uuid()
      .references(() => applications.id)
      .notNull(),
    ...timestamps,
  },
  (t) => [unique().on(t.name, t.userId)],
);
