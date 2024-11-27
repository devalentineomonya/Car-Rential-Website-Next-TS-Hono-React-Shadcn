import {
  pgTable,
  text,
  timestamp,
  boolean,
  jsonb,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
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

export const cars = pgTable("cars", {
  id: text("id").primaryKey(),
  ownerId: text("owner_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  image: text("image"),
  dateManufactured: timestamp("date_manufactured").notNull(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  mileage: integer("mileage").notNull(),
  color: text("color"),
  pricePerDay: integer("price_per_day"),
  pricePerKm: integer("price_per_km"),
  isForDelivery: boolean("is_for_delivery").notNull().default(false),
  isAvailable: boolean("is_available").notNull().default(true),
  isRented: boolean("is_rented").notNull().default(false),
  bodyType: text("body_type"),
  fuelType: text("fuel_type"),
  transmission: text("transmission"),
  driveType: text("drive_type"),
  condition: text("condition"),
  engineSize: text("engine_size"),
  doors: integer("doors"),
  cylinders: integer("cylinders"),
  features: jsonb("features"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const carRelations = relations(cars, ({ one }) => ({
  owner: one(users, {
    fields: [cars.ownerId],
    references: [users.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users);
export const insertCarSchema = createInsertSchema(cars);
