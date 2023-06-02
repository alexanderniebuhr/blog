import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

const isServer = typeof window === "undefined"
const isBuild = isServer && process.env.STATE === "building"

const serverVariables = {
	build: {
		// Put in here any server-side variable that is hardcoded on build
		VITE_TIME: z.string().nonempty(),
	},
	runtime: {
		// Put in here any server-side variable that is read at runtime
		CF_PAGES_URL: z.string().nonempty(),
	},
}

export const createRuntimeEnv = (prop?: unknown) => {
	const rEnv = prop as Record<string, string | number | boolean | undefined>
	return createEnv({
		skipValidation:
			isServer &&
			!!process.env.SKIP_ENV_VALIDATION &&
			process.env.SKIP_ENV_VALIDATION !== "false" &&
			process.env.SKIP_ENV_VALIDATION !== "0",
		server: (isBuild
			? serverVariables.build
			: { ...serverVariables.runtime, ...serverVariables.build }) as typeof serverVariables.build &
			typeof serverVariables.runtime,
		clientPrefix: "PUBLIC_",
		client: {
			PUBLIC_API_URL: z.string(),
		},
		// check if fileEnv is empty, if so use import.meta.env, otherwise use fileEnv
		runtimeEnv: rEnv ? { ...rEnv, ...import.meta.env } : import.meta.env,
	})
}
