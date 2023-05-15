// import { authRouter } from "./router/auth";
// import { postRouter } from "./router/post";
import { userRouter } from './routers/user.js'
import { createTRPCRouter } from './trpc.js'

export const appRouter = createTRPCRouter({
	users: userRouter,
})

export type AppRouter = typeof appRouter
