import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

import { doublePrecision, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  description: text("description"),
  price: doublePrecision("price"),
});

export type Product = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;
