import { createTRPCRouter, publicProcedure } from "../trpc.js"
import { z } from "zod"

export const userRouter = createTRPCRouter({
	getById: publicProcedure.input(z.string()).query(({ input }) => {
		// console.log("ctx", ctx)
		console.log("input", input)
		return {
			name: "Alex",
		}
	}),
})
