import {
  pgEnum,
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { rateableTypeEnum } from "./enums";



export const ratings = pgTable("ratings", {
  id: serial("id").primaryKey(),
  entityId: varchar("entity_id", { length: 255 }).notNull(),
  entityType: rateableTypeEnum("entity_type").notNull(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  rating: integer("rating").notNull().default(3),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


export const ratingsRelations = relations(ratings, ({ one }) => ({
  user: one(users, {
    fields: [ratings.userId],
    references: [users.id],
  }),
}));
