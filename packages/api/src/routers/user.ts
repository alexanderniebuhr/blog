import { eq, products } from '@alexanderniebuhr/blog-db'
import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc.js'

export const userRouter = createTRPCRouter({
	getById: publicProcedure.input(z.object({ id: z.string() })).query(
		({ input, ctx }) => {
			// console.log(ctx)
			return ctx.db.select().from(products).where(eq(products.id, input.id))
		},
	),
})
