import type { AppRouter } from "./root.js"
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"

export { appRouter, type AppRouter } from "./root.js"
export { createTRPCContext } from "./trpc.js"

// /**
//  * Inference helpers for input types
//  * @example type HelloInput = RouterInputs['example']['hello']
//  **/
export type RouterInputs = inferRouterInputs<AppRouter>

// /**
//  * Inference helpers for output types
//  * @example type HelloOutput = RouterOutputs['example']['hello']
//  **/
export type RouterOutputs = inferRouterOutputs<AppRouter>
