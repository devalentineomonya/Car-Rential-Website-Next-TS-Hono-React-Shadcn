import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { cars } from "./cars";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  clerk_id: text("clerk_id").notNull().unique(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  location: text("location"),
  address: text("address"),
  phone: text("phone"),
  isNew: boolean("is_new").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  cars: many(cars),
}));

export const insertUserSchema = createInsertSchema(users);
