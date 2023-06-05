import type { AppRouter } from "./root.ts"
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"

export { appRouter, type AppRouter } from "./root.ts"
export { createTRPCContext } from "./trpc.ts"

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
