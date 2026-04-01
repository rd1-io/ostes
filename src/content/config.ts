import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    slug: z.string(),
    cardText: z.string(),
    order: z.number(),
    symptoms: z.array(z.string()),
    methods: z.array(z.string()),
  }),
});

const doctors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/doctors' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    experience: z.string(),
    tags: z.array(z.string()),
    order: z.number(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
  }),
});

export const collections = { services, doctors, blog };
