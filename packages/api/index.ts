import type { AppRouter } from "./src/root.js"
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"

export { appRouter, type AppRouter } from "./src/root.js"
export { createTRPCContext } from "./src/trpc.js"

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
