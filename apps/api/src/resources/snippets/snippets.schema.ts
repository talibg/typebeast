import { z } from 'zod'

export const createSnippetSchema = z.object({
    title: z.string(),
    code: z.string()
})

export type CreateSnippetRequestBody = z.infer<typeof createSnippetSchema>
