import type { AppRouter } from "@alexanderniebuhr/blog-trcp"

import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"

// export const createTrpcClient = (serverUrl: string) => createTRPCProxyClient<AppRouter>({
export const trpcAstro = (serverUrl: string) =>
	createTRPCProxyClient<AppRouter>({
		// transformer: superjson
		links: [
			httpBatchLink({
				url: `${serverUrl}/trpc`,
				maxURLLength: 2083, // a suitable size
			}),
		],
	})
