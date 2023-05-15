export const prerender = false

import type { APIRoute } from 'astro'

import { appRouter, createTRPCContext } from '@alexanderniebuhr/blog-trcp'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

export const all: APIRoute = (opts) => {
	return fetchRequestHandler({
		endpoint: '/trpc',
		req: opts.request,
		router: appRouter,
		createContext: createTRPCContext,
	})
}
