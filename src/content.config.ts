import { defineCollection, reference, type SchemaContext } from "astro:content";
import { glob } from "astro/loaders";
// Astro 7 desaconseja el re-export `z` de astro:content y espera zod v4 directo.
import { z } from "zod";

// Blog y proyectos comparten los mismos campos, así que el esquema se define
// una vez y cada colección solo cambia a qué colección apuntan las referencias.
const baseSchema = (collection: "blog" | "project", _ctx: SchemaContext) =>
  z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(["en", "es"]).default("en"),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
    relatedPosts: z.array(reference(collection)).optional(),
  });

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: (ctx) => baseSchema("blog", ctx),
});

const project = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: (ctx) => baseSchema("project", ctx),
});

export const collections = { blog, project };
