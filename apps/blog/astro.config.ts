import cloudflare from '@astrojs/cloudflare'
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
	},
	scopedStyleStrategy: 'class',
	base: '/',
	site: 'https://nbhr.io/',
	experimental: {
		assets: false,
	},
	integrations: [react(), markdoc(), /*prefetch() ,*/ sitemap()],
	output: 'hybrid',
	adapter: cloudflare({
		mode: 'advanced',
	}),
	vite: {
		// resolve: {
		// 	alias: {
		// 		"@alexanderniebuhr/blog-trcp": path.join(__dirname, "../../packages/api/src"),
		// 	},
		// },
		build: {
			minify: false,
		},
		define: {
			'process.env.VITE_TIME': JSON.stringify(process.env.VITE_TIME),
		},
	},
})
