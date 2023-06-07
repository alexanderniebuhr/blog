import type { InferModel } from 'drizzle-orm'
import { doublePrecision, pgTable, text, uuid } from 'drizzle-orm/pg-core'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as _drizzle from '../../node_modules/drizzle-orm/db.d-a6fe1b19.js'

export const products = pgTable('products', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name'),
	description: text('description'),
	price: doublePrecision('price'),
})

export type Product = InferModel<typeof products>
export type NewProduct = InferModel<typeof products, 'insert'>
