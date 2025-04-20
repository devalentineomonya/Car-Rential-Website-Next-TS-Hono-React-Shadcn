import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { cars } from "./cars";
import { drivers } from "./drivers";
import { statusEnum } from "./enums";


export const rentals = pgTable("rentals", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  carId: text("car_id").references(() => cars.id),
  driverId: text("driver_id").references(() => drivers.id),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  totalCost: decimal("total_cost", { precision: 10, scale: 2 }).notNull(),
  status: statusEnum("status").notNull().default("pending"),
  pickupLocation: text("pickup_location").notNull(),
  dropoffLocation: text("dropoff_location").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const rentalRelations = relations(rentals, ({ one }) => ({
  user: one(users, { fields: [rentals.userId], references: [users.id] }),
  car: one(cars, { fields: [rentals.carId], references: [cars.id] }),
  driver: one(drivers, {
    fields: [rentals.driverId],
    references: [drivers.id],
  }),
}));
