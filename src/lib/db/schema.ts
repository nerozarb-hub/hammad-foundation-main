import { pgTable, text, integer, boolean, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";

export const currencyEnum = pgEnum("currency", ["USD", "PKR"]);
export const categoryEnum = pgEnum("category", ["Education", "Roti Bank", "Zakat"]);
export const statusEnum = pgEnum("status", ["Pending", "Completed", "Failed"]);

export const products = pgTable("products", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    price: integer("price").notNull(), // stored in cents/lowest denomination
    currency: currencyEnum("currency").notNull(),
    category: categoryEnum("category").notNull(),
    imageUrl: text("image_url").notNull(),
    isRecurring: boolean("is_recurring").default(false),
    createdAt: timestamp("created_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
    id: uuid("id").defaultRandom().primaryKey(),
    donorName: text("donor_name").notNull(),
    donorEmail: text("donor_email").notNull(),
    amount: integer("amount").notNull(),
    status: statusEnum("status").default("Pending"),
    paymentMethod: text("payment_method").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
