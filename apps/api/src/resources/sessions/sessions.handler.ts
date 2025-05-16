import * as argon2 from 'argon2'
import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
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
import { fetchUsersServiceByUsername } from '../users/users.service.ts'
import type { ExtendedJWTPayload } from '../../utils/jwt.ts'

export const fetchSessionHandler = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken as string
    if (!refreshToken) throw new HttpError('Unauthorized', 401)

    const userAgent = req.get('user-agent') || ''
    const remoteAddress = req?.socket?.remoteAddress
    const ipAddress = remoteAddress?.replace(/^::ffff:/, '') || ''
    const newJti = uuidv4()

    const { uid: userId, jti, username, role } = verifyToken(refreshToken, JWT_REFRESH_SECRET) as ExtendedJWTPayload
    if (!userId && !username) throw new HttpError('Unauthorized', 401)

    const activeSession = await fetchSessionsService(userId, jti)
    if (!activeSession) throw new HttpError('Unauthorized', 401)
    const sessionMatch = await argon2.verify(activeSession.token, refreshToken)
    if (!sessionMatch) throw new HttpError('Unauthorized', 401)

    const { token: accessToken, refreshToken: newRefreshToken } = createTokens({
        uid: userId,
        jti: newJti,
        username,
        role
    })
    await updateSessionsService(newRefreshToken, userId, jti, newJti, userAgent, ipAddress)

    res.cookie('refreshToken', newRefreshToken, { httpOnly: true })
    res.status(200).json({ user: { id: userId, username, role }, accessToken })
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
    const { username: usernameParam, password: passwordParam } = req.body

    const user = await fetchUsersServiceByUsername(usernameParam)
    if (!user) throw new HttpError('Unauthorized', 401)
    const { id, username, role, password } = user

    const passwordMatch = await argon2.verify(password, passwordParam)
    if (!passwordMatch) throw new HttpError('Unauthorized', 401)
    const jti = uuidv4()
    const { token: accessToken, refreshToken } = createTokens({
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
    res.status(200).json({ user: { id, username, role }, accessToken })
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

    const { uid: userId, jti, username } = verifyToken(refreshToken, JWT_REFRESH_SECRET) as ExtendedJWTPayload
    if (!userId && !username) throw new HttpError('Unauthorized', 401)

    const currentSession = await fetchSessionsService(userId, jti)
    if (!currentSession) throw new HttpError('Unauthorized', 401)

    await deleteSessionsService(jti)

    res.clearCookie('refreshToken', { path: '/', domain: 'localhost' })
    res.status(200).json({ message: 'Logout success' })
}
