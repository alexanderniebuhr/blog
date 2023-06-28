import cloudflare from '@astrojs/cloudflare'
import icon from 'astro-icon'

import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'

import markdoc from '@astrojs/markdoc'
// import prefetch from "@astrojs/prefetch"
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'

try {
	await import('./src/t3-env').then((m) =>
		m.createRuntimeEnv(loadEnv(import.meta.env.MODE, process.cwd(), ''))
	)
} catch (error) {
	console.error(error)
	process.exit(1)
}

// import { fileURLToPath } from "url"
// import path from "path"

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// https://astro.build/config
export default defineConfig({
	build: {
		inlineStylesheets: 'auto',
		split: false,
	},
	scopedStyleStrategy: 'class',
	base: '/',
	site: 'https://nbhr.io/',
	experimental: {
		assets: false,
	},
	integrations: [
		react(),
		markdoc(),
		icon({
			include: {
				carbon: ['*'], // Loads entire Material Design Icon set
			},
		}),
		/*prefetch() ,*/
		sitemap(),
	],
	output: 'hybrid',
	adapter: cloudflare({
		mode: 'directory',
	}),
	vite: {
		experimental: {},
		css: {
			transformer: 'lightningcss',
			lightningcss: {
				targets: browserslistToTargets(browserslist('defaults')),
				drafts: {
					nesting: true,
					customMedia: true,
				},
			},
		},
		build: {
			minify: false,
			cssMinify: 'lightningcss',
		},
		define: {
			'process.env.VITE_TIME': JSON.stringify(process.env.VITE_TIME),
		},
	},
})
