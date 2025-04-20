import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { users } from "./users";
import { paymentMethodEnum, statusEnum } from "./enums";
import { deliveries } from "./delivery";
import { rentals } from "./rental";

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(),
  reference: text("reference").notNull().unique(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: statusEnum("status").notNull().default('pending'),
  userId: text("user_id").references(() => users.id),
  rentalId: text("rental_id").references(() => rentals.id),
  deliveryId: text("delivery_id").references(() => deliveries.id),
  paymentMethod: paymentMethodEnum("payment_method").notNull(),
  paystackAuthorization: jsonb("paystack_authorization"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const transactionRelations = relations(transactions, ({ one }) => ({
  user: one(users, { fields: [transactions.userId], references: [users.id] }),
  rental: one(rentals, { fields: [transactions.rentalId], references: [rentals.id] }),
  delivery: one(deliveries, { fields: [transactions.deliveryId], references: [deliveries.id] }),
}));
