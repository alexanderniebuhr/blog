import type { InferModel } from 'drizzle-orm'
// import type { PgTableWithColumns, PgColumn } from "drizzle-orm/pg-core";

import { doublePrecision, pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const products = pgTable('products', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: text('name'),
	description: text('description'),
	price: doublePrecision('price'),
})

export type Product = InferModel<typeof products>
export type NewProduct = InferModel<typeof products, 'insert'>
