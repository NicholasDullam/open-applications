import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: text("id").primaryKey().notNull(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
