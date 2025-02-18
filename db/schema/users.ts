import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./timestamps";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  email: text().notNull(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  ...timestamps,
});
