import { createEnv } from '@t3-oss/env-core'
import { z, ZodError } from 'zod'

const isServer = typeof window === 'undefined'
const isBuild = isServer && process.env.STATE === 'building'

const serverVariables = {
	build: {
		// Put in here any server-side variable that is hardcoded on build
		VITE_TIME: z.string().nonempty(),
	},
	runtime: {
		// Put in here any server-side variable that is read at runtime
		CF_PAGES_URL: z.string().nonempty(),
		DATABASE_URL: z.string().nonempty(),
	},
}

export const createRuntimeEnv = (prop?: unknown) => {
	if (isBuild) {
		console.log(
			'Please make sure that following variables are set in your server runtime environment: ',
			Object.keys(serverVariables.runtime).join(', '),
		)
	}
	const rEnv = prop as
		| Record<string, boolean | number | string | undefined>
		| undefined
	return createEnv({
		onValidationError: (error: ZodError) => {
			console.error(
				'❌ Invalid environment variables:',
				error.flatten().fieldErrors,
			)
			process.exit(1)
		},
		// onInvalidAccess: (error: ZodError) => { },
		skipValidation: isServer &&
			!!process.env.SKIP_ENV_VALIDATION &&
			process.env.SKIP_ENV_VALIDATION !== 'false' &&
			process.env.SKIP_ENV_VALIDATION !== '0',
		server: (isBuild
			? serverVariables.build
			: { ...serverVariables.runtime, ...serverVariables.build }) as
				& typeof serverVariables.build
				& typeof serverVariables.runtime,
		clientPrefix: 'PUBLIC_',
		client: {
			PUBLIC_API_URL: z.string(),
		},
		// check if fileEnv is empty, if so use import.meta.env, otherwise use fileEnv
		runtimeEnv: rEnv ? { ...rEnv, ...import.meta.env } : import.meta.env,
	})
}
