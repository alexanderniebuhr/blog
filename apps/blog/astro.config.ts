import cloudflare from "@astrojs/cloudflare";
import icon from "astro-icon";

import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";

import markdoc from "@astrojs/markdoc";
// import prefetch from "@astrojs/prefetch"
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

await import("./src/t3-env").then((m) =>
  m.createRuntimeEnv(loadEnv(import.meta.env.MODE, process.cwd(), "")),
);

// import { fileURLToPath } from "url"
// import path from "path"

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// https://astro.build/config
export default defineConfig({
  build: {
    inlineStylesheets: "auto",
    split: true,
  },
  scopedStyleStrategy: "class",
  base: "/",
  site: "https://nbhr.io/",
  experimental: {},
  integrations: [
    react(),
    markdoc(),
    icon({
      include: {
        carbon: ["3d-cursor"],
        charm: ["anchor", "flame"],
      },
    }),
    /*prefetch() ,*/
    sitemap(),
  ],
  output: "server",
  adapter: cloudflare({
    mode: "directory",
    functionPerRoute: true,
  }),
  vite: {
    experimental: {},
    css: {
      transformer: "lightningcss",
      lightningcss: {
        targets: browserslistToTargets(browserslist("defaults")),
        drafts: {
          nesting: true,
          customMedia: true,
        },
      },
    },
    build: {
      minify: true,
      cssMinify: "lightningcss",
    },
    define: {
      "process.env.VITE_TIME": JSON.stringify(process.env.VITE_TIME),
    },
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/noop",
    },
  },
});
