// import rss from "@astrojs/rss"
// import type { APIContext } from "astro"
// import { getCollection } from "astro:content"

// export async function get(context: APIContext) {
// 	const posts = await getCollection("bits")
// 	return rss({
// 		title: "NBHR",
// 		description: "NBHR",
// 		site: String(context.site),
// 		items: posts.map((post) => ({
// 			title: post.data.title,
// 			description: post.data.description,
// 			pubDate: post.data.pubDate,
// 			link: post.slug,
// 		})),
// 	})
// }
