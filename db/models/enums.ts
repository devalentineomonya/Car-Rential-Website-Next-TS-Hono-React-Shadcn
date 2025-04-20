import { pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
  "pending",
  "active",
  "completed",
  "cancelled",
]);

export const rateableTypeEnum = pgEnum("rateable_type", [
  "driver",
  "car",
  "ride",
  "delivery",
]);

export const paymentMethodEnum = pgEnum("payment_method", [
  "card",
  "bank_transfer",
  "mobile_money",
]);
