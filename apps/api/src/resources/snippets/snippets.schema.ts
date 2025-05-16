import { z } from 'zod'

export const createSnippetSchema = z.object({
    title: z.string(),
    code: z.string()
})

export const updateSnippetSchema = z.object({
    title: z.string().optional(),
    code: z.string().optional()
})

export type CreateSnippetRequestBody = z.infer<typeof createSnippetSchema>
export type UpdateSnippetRequestBody = z.infer<typeof updateSnippetSchema>
