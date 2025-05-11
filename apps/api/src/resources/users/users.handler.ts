import { type Request, type Response } from 'express'
import { type CreateUserRequestBody } from './users.schema.ts'
import { createUsersService, fetchUsersServiceById } from './users.service.ts'
import { createTokens } from '../../utils/jwt.ts'
import { createSessionsService } from '../sessions/sessions.services.ts'

export const createUserHandler = async (
    req: Request<
        Record<string, never>,
        Record<string, never>,
        CreateUserRequestBody,
        Record<string, string[] | undefined>
    >,
    res: Response
): Promise<void> => {
    const { username, email: emailParam, password } = req.body
    const { id, email, role } = await createUsersService(emailParam, username, password)
    const { token, refreshToken } = createTokens(id, email, role)
    await createSessionsService(refreshToken, id)
    res.cookie('refreshToken', refreshToken, { httpOnly: true })
    res.status(201).json({ user: { id, email, role }, accessToken: token })
}

export const fetchUserHandler = async (_req: Request, res: Response) => {
    const { id } = res.locals.user as { id: number }
    const user = await fetchUsersServiceById(id)
    res.status(200).json(user)
}
