import { z } from 'zod'

export const projectSchema = z.object({
  demoUrl: z.string().url().nullable(),
  description: z.string(),
  githubUrl: z.string().url().nullable(),
  id: z.number(),
  image: z.string(),
  slugs: z.array(z.string()),
  title: z.string(),
})

export const projectsSchema = z.array(projectSchema)

const strapiProjectItemSchema = z.object({
  createdAt: z.string(),
  descripcion: z.string(),
  documentId: z.string(),
  id: z.number(),
  link_demo: z.string().url().nullable(),
  link_github: z.string().url().nullable(),
  publishedAt: z.string().nullable(),
  stack_sluck: z.array(z.string()).nullable(),
  titulo: z.string(),
  updatedAt: z.string(),
})

export const strapiProjectsResponseSchema = z.object({
  data: z.array(strapiProjectItemSchema),
  meta: z.object({
    pagination: z.object({
      page: z.number(),
      pageCount: z.number(),
      pageSize: z.number(),
      total: z.number(),
    }),
  }),
})

export type Project = z.infer<typeof projectSchema>
export type StrapiProjectsResponse = z.infer<typeof strapiProjectsResponseSchema>