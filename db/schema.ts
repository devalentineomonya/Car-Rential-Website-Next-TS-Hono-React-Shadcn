import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  jsonb,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Users Table
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

// Relations for Users
export const userRelations = relations(users, ({ many }) => ({
  cars: many(cars),
}));

// Cars Table
export const cars = pgTable("cars", {
  id: text("id").primaryKey(),
  ownerId: text("owner_id"),
  name: text("name").notNull(),
  description: text("description").notNull(),
  images: jsonb("images").notNull().$type<string[]>(),
  dateManufactured: timestamp("date_manufactured").notNull(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  mileage: integer("mileage").notNull(),
  color: text("color").notNull(),
  pricePerDay: integer("price_per_day"),
  pricePerKm: integer("price_per_km"),
  isForDelivery: boolean("is_for_delivery").notNull().default(false),
  isAvailable: boolean("is_available").notNull().default(true),
  isForHire: boolean("is_for_hire").notNull().default(false),
  isForRent: boolean("is_for_rent").notNull().default(false),
  bodyType: text("body_type").notNull(),
  fuelType: text("fuel_type").notNull(),
  transmission: text("transmission").notNull(),
  driveType: text("drive_type").notNull(),
  condition: text("condition").notNull(),
  engineSize: integer("engine_size").notNull(),
  doors: integer("doors").notNull(),
  cylinders: integer("cylinders").notNull(),
  features: jsonb("features"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Relations for Cars
export const carRelations = relations(cars, ({ one }) => ({
  owner: one(users, {
    fields: [cars.ownerId],
    references: [users.id],
  }),
}));

// Zod Schema for Cars
export const insertCarSchema = createInsertSchema(cars);
export const selectCarSchema = createSelectSchema(cars);

// Dynamic Validation Schema
export const dynamicSchema = z
  .object({
    ...insertCarSchema.shape,
    id: z.string().optional(),
    pricePerDay: z.preprocess(
      (val) => (val === "" || isNaN(Number(val)) ? undefined : Number(val)),
      z.number().min(0).optional()
    ),
    pricePerKm: z.preprocess(
      (val) => (val === "" || isNaN(Number(val)) ? undefined : Number(val)),
      z.number().min(0).optional()
    ),
    images: z.array(z.string()),
    carPurpose: z.string().optional(),
    isForRent: z.boolean().optional(),
    isForHire: z.boolean().optional(),
    isForDelivery: z.boolean().optional(),
    dateManufactured: z.preprocess(
      (val) => (typeof val === "string" ? new Date(val) : val),
      z.date()
    ),
    mileage: z.number().min(0, "Mileage must be 0 or greater").optional(),
    engineSize: z
      .number()
      .min(500, "Engine size must be at least 500cc")
      .max(8000, "Engine size cannot exceed 8000cc")
      .optional(),
    doors: z
      .number()
      .min(2, "Number of doors must be at least 2")
      .max(6, "Number of doors cannot exceed 6")
      .optional(),
    cylinders: z
      .number()
      .min(3, "Cylinders must be at least 3")
      .max(12, "Cylinders cannot exceed 12")
      .optional(),
  })
  .omit({ createdAt: true, updatedAt: true })
  .refine((data) => (data.isForRent ? data.pricePerDay !== undefined : true), {
    message: "Price per day is required when car is available for rent",
    path: ["pricePerDay"],
  })
  .refine(
    (data) =>
      data.isForHire || data.isForDelivery
        ? data.pricePerKm !== undefined
        : true,
    {
      message:
        "Price per km is required when car is available for hire or delivery",
      path: ["pricePerKm"],
    }
  );

// Zod Schema for Users
export const insertUserSchema = createInsertSchema(users);
