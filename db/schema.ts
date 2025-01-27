import { decimal, integer, pgTable, smallint, varchar } from "drizzle-orm/pg-core";

export const vendors = pgTable("vendors", {
    id: smallint("id").notNull().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 45 }).notNull(),
});

export const products = pgTable("products", {
    id: integer("id").notNull().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 45 }).notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    vendorId: smallint("vendor_id")
        .references(() => vendors.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        .notNull(),
});
