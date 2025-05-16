import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
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
    const { username: usernameParam, email: emailParam, password } = req.body
    const { id, username, role } = await createUsersService(emailParam, usernameParam, password)
    const jti = uuidv4()
    const { token, refreshToken } = createTokens({
        uid: id,
        jti,
        username,
        role
    })

    const userAgent = req.get('user-agent') || ''
    const remoteAddress = req?.socket?.remoteAddress
    const ipAddress = remoteAddress?.replace(/^::ffff:/, '') || ''
    await createSessionsService(refreshToken, id, jti, userAgent, ipAddress)
    res.cookie('refreshToken', refreshToken, { httpOnly: true })
    res.status(201).json({ user: { id, username, role }, accessToken: token })
}

export const fetchUserHandler = async (_req: Request, res: Response) => {
    const { id } = res.locals.user as { id: number }
    const user = await fetchUsersServiceById(id)
    res.status(200).json(user)
}
