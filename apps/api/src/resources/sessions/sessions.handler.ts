import * as argon2 from 'argon2'
import { type Request, type Response } from 'express'
import { type CreateSessionRequestBody } from './sessions.schema.ts'
import {
    createSessionsService,
    deleteSessionsService,
    fetchSessionsService,
    updateSessionsService
} from './sessions.services.ts'
import { HttpError } from '../../lib/http-error.ts'
import { JWT_REFRESH_SECRET } from '../../utils/constants.ts'
import { createTokens, verifyToken } from '../../utils/jwt.ts'
import { fetchUsersServiceByEmail } from '../users/users.service.ts'
import type { ExtendedJWTPayload } from '../../utils/jwt.ts'

export const fetchSessionHandler = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken as string
    if (!refreshToken) throw new HttpError('Unauthorized', 401)

    const { userId, email, role } = verifyToken(refreshToken, JWT_REFRESH_SECRET) as ExtendedJWTPayload
    if (!userId && !email) throw new HttpError('Unauthorized', 401)

    const activeSession = await fetchSessionsService(refreshToken, userId)
    if (!activeSession) throw new HttpError('Unauthorized', 401)

    const { token: accessToken, refreshToken: newRefreshToken } = createTokens(userId, email, role)
    await updateSessionsService(refreshToken, newRefreshToken, userId)

    res.cookie('refreshToken', newRefreshToken, { httpOnly: true })
    res.status(200).json({ user: { id: userId, email, role }, accessToken })
}

export const createSessionHandler = async (
    req: Request<
        Record<string, never>,
        Record<string, never>,
        CreateSessionRequestBody,
        Record<string, string[] | undefined>
    >,
    res: Response
): Promise<void> => {
    const { email: emailParam, password: passwordParam } = req.body

    const user = await fetchUsersServiceByEmail(emailParam)
    if (!user) throw new HttpError('Unauthorized', 401)
    const { id, email, role, password } = user

    const passwordMatch = await argon2.verify(password, passwordParam)
    if (!passwordMatch) throw new HttpError('Unauthorized', 401)

    const { token: accessToken, refreshToken } = createTokens(id, email, role)

    await createSessionsService(refreshToken, id)

    res.cookie('refreshToken', refreshToken, { httpOnly: true })
    res.status(200).json({ user: { id, email, role }, accessToken })
}

export const deleteSessionHandler = async (
    req: Request<
        Record<string, never>,
        Record<string, never>,
        Record<string, never>,
        Record<string, string | string[] | undefined>
    >,
    res: Response
): Promise<void> => {
    const refreshToken = req.cookies.refreshToken as string
    if (!refreshToken) throw new HttpError('Unauthorized', 401)

    const { userId, email } = verifyToken(refreshToken, JWT_REFRESH_SECRET) as ExtendedJWTPayload
    if (!userId && !email) throw new HttpError('Unauthorized', 401)

    const currentSession = await fetchSessionsService(refreshToken, userId)
    if (!currentSession) throw new HttpError('Unauthorized', 401)

    await deleteSessionsService(refreshToken)

    res.clearCookie('refreshToken', { path: '/', domain: 'localhost' })
    res.status(200).json({ message: 'Logout success' })
}
