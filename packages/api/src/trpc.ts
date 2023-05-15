import type { inferAsyncReturnType } from '@trpc/server'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

import { getRuntime } from '@astrojs/cloudflare/runtime'
import { initTRPC } from '@trpc/server'
import { ZodError } from 'zod'

import { drizzle, Pool } from '@alexanderniebuhr/blog-db'

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API
 *
 * These allow you to access things like the database, the session, etc, when
 * processing a request
 */
type CreateContextOptions = {
	DATABASE_URL: string
}

interface Env {
	DATABASE_URL: string
}

/**
 * This is the actual context you'll use in your router. It will be used to
 * process every request that goes through your tRPC endpoint
 * @link https://trpc.io/docs/context
 */
export function createTRPCContext(
	{ req, resHeaders }: FetchCreateContextFnOptions,
) {
	const runtime = getRuntime(req)
	console.log('runtime', JSON.stringify(runtime, null, 2))
	const client = new Pool({ connectionString: runtime.env.DATABASE_URL })
	const db = drizzle(client)

	return { req, resHeaders, db }
}
export type Context = inferAsyncReturnType<typeof createTRPCContext>

/**
 * 2. INITIALIZATION
 *
 * This is where the trpc api is initialized, connecting the context and
 * transformer
 */

const t = initTRPC.context<Context>().create({
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError: error.cause instanceof ZodError
					? error.cause.flatten()
					: null,
			},
		}
	},
})

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these
 * a lot in the /src/server/api/routers folder
 */

/**
 * This is how you create new routers and subrouters in your tRPC API
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export const publicProcedure = t.procedure

// /**
//  * Reusable middleware that enforces users are logged in before running the
//  * procedure
//  */
// const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
// 	if (!ctx.session?.user) {
// 		throw new TRPCError({ code: "UNAUTHORIZED" });
// 	}
// 	return next({
// 		ctx: {
// 			// infers the `session` as non-nullable
// 			session: { ...ctx.session, user: ctx.session.user },
// 		},
// 	});
// });

// /**
//  * Protected (authed) procedure
//  *
//  * If you want a query or mutation to ONLY be accessible to logged in users, use
//  * this. It verifies the session is valid and guarantees ctx.session.user is not
//  * null
//  *
//  * @see https://trpc.io/docs/procedures
//  */
// export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
