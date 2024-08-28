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

const projectsSchema = z.object({
  title: z.string(),
  description: z.string(),
  lang: z.enum(["en", "es"]).default("en"),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  relatedPosts: z.array(reference("projects")).optional(),
});

const blog = defineCollection({ type: "content", schema: blogSchema });
const project = defineCollection({ type: "content", schema: projectsSchema });

export type Blog = z.infer<typeof blogSchema>;
export type Project = z.infer<typeof projectsSchema>;

export const collections = { blog, project };
