import { z } from 'zod'

export const createSessionSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export type CreateSessionRequestBody = z.infer<typeof createSessionSchema>
