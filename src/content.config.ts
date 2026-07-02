import { defineCollection } from "astro/content/config";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const writings = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/writings' }),
    schema: z.object({
        title: z.string(),
        date: z.date(),
        excerpt: z.string(),
        shouldFeature: z.boolean().default(false),
        draft: z.boolean().default(true),
        tags: z.array(z.string()),
    })
})

export const collections = { writings };
