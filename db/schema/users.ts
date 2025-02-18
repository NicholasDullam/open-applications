import { pgTable, text, unique, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./timestamps";

export const users = pgTable(
  "users",
  {
    id: uuid().primaryKey().defaultRandom().notNull(),
    email: text().notNull(),
    firstName: text().notNull(),
    lastName: text().notNull(),
    externalId: text().notNull(),
    ...timestamps,
  },
  (t) => [unique().on(t.email), unique().on(t.externalId)],
);
