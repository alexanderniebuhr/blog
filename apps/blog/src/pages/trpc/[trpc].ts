export const prerender = false
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import type { APIRoute } from "astro"
import { appRouter, createTRPCContext } from "@alexanderniebuhr/trcp-router"

export const all: APIRoute = (opts) => {
	return fetchRequestHandler({
		endpoint: "/trpc",
		req: opts.request,
		router: appRouter,
		createContext: createTRPCContext,
	})
}
