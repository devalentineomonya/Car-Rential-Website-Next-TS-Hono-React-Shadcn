import {relations} from "drizzle-orm";
import {
    pgTable,
    text,
    timestamp,
    boolean,
    jsonb,
    integer,
} from "drizzle-orm/pg-core";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

import {users} from "./users";

export const cars = pgTable("cars", {
    id: text("id").primaryKey(),
    ownerId: text("owner_id").references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
    }),
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

export const carRelations = relations(cars, ({one}) => ({
    owner: one(users, {
        fields: [cars.ownerId],
        references: [users.id],
    }),
}));

const carPurposeEnum = z.enum(["ride", "deliver", "rent"]);
export type CarPurpose = z.infer<typeof carPurposeEnum>;

export const insertCarSchema = createInsertSchema(cars)
    .omit({createdAt: true, updatedAt: true})
    .extend({
        carPurpose: carPurposeEnum,
    })
    .superRefine((data, ctx) => {
        const {carPurpose, pricePerDay, pricePerKm} = data;

        if (carPurpose === "rent") {
            if (!pricePerDay || pricePerDay <= 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Price per day is required for rental cars",
                    path: ["pricePerDay"],
                });
            }
            if (pricePerKm != null) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:
                        "Price per km should not be filled for rental cars",
                    path: ["pricePerKm"],
                });
            }
        } else {
            if (!pricePerKm || pricePerKm <= 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Price per km is required",
                    path: ["pricePerKm"],
                });
            }
            if (pricePerDay != null) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:
                        "Price per day should not be filled unless car is for rent",
                    path: ["pricePerDay"],
                });
            }
        }
    });

export const selectCarSchema = createSelectSchema(cars);
export type CarType = z.infer<typeof selectCarSchema>;
