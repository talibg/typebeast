import { z } from 'zod'

export const createUserSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8)
})

export type CreateUserRequestBody = z.infer<typeof createUserSchema>
