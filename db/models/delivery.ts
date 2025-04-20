import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { drivers } from "./drivers";
import { users } from "./users";
import { cars } from "./cars";
import { statusEnum } from "./enums";


// Delivery Schema
export const deliveries = pgTable("deliveries", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  carId: text("car_id").references(() => cars.id),
  driverId: text("driver_id").references(() => drivers.id),
  pickupTime: timestamp("pickup_time").notNull(),
  deliveryTime: timestamp("delivery_time"),
  status: statusEnum("status").notNull().default("pending"),
  pickupAddress: text("pickup_address").notNull(),
  deliveryAddress: text("delivery_address").notNull(),
  recipientName: text("recipient_name").notNull(),
  recipientPhone: text("recipient_phone").notNull(),
  packageDetails: jsonb("package_details"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const deliveryRelations = relations(deliveries, ({ one }) => ({
  user: one(users, { fields: [deliveries.userId], references: [users.id] }),
  car: one(cars, { fields: [deliveries.carId], references: [cars.id] }),
  driver: one(drivers, {
    fields: [deliveries.driverId],
    references: [drivers.id],
  }),
}));
