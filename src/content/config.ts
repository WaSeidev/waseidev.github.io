import { defineCollection, reference, z } from "astro:content";

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  lang: z.enum(["en", "es"]).default("en"),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  relatedPosts: z.array(reference("blog")).optional(),
});

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: blogSchema,
});

export type Blog = z.infer<typeof blogSchema>;

export const collections = { blog };
