// 1. Import utilities from `astro:content`
// import { rssSchema } from "@astrojs/rss"
import { defineCollection, reference, z } from 'astro:content'
// Define your data collection(s) here.
const authors = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string(),
		socialLink: z.string().url(),
	}),
})
// 2. Define your content collection(s)
const bitsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.string(),
		// Reference a single author from the `authors` collection by `id`
		author: reference('authors'),
		// Reference an array of related posts from the `blog` collection by `slug`
		// related: z.array(reference("blog")),
	}),
	// schema: rssSchema.extend({
	// 	author: z.string().optional(),
	// }),
})

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
	bits: bitsCollection,
	authors: authors,
}
