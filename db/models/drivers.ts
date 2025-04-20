import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";
import { cars } from "./cars";

export const drivers = pgTable("drivers", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  licenseNumber: text("license_number").notNull(),
  carId: text("car_id").references(() => cars.id),
  isActive: boolean("is_active").notNull().default(true),
  isApproved: boolean("is_approved").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const driverRelations = relations(drivers, ({ one }) => ({
  user: one(users, { fields: [drivers.userId], references: [users.id] }),
  car: one(cars, { fields: [drivers.carId], references: [cars.id] }),
}));
