import { createTRPCRouter, publicProcedure } from "../trpc.js"
import { z } from "zod"
import { eq, products } from "@alexanderniebuhr/blog-db"

export const userRouter = createTRPCRouter({
	getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
		// console.log(ctx)
		return ctx.db.select().from(products).where(eq(products.id, input.id))
	}),
})
