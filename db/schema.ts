import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  clerk_id: text("clerk_id").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  location: text("location"),
  address: text("address"),
  phone: integer("phone"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
