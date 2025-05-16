import { z } from 'zod'

export const createSessionSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(8)
})

export type CreateSessionRequestBody = z.infer<typeof createSessionSchema>
