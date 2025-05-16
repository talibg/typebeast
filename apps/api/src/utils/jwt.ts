import jwt from 'jsonwebtoken'
import { JWT_REFRESH_SECRET, JWT_SECRET } from './constants.ts'
import type { JwtPayload } from 'jsonwebtoken'

export type TokenPayload = {
    uid: number
    jti: string
    username: string
    role: string
}

export interface ExtendedJWTPayload extends JwtPayload {
    uid: number
    jti: string
    username: string
    role: string
}

export const generateToken = (tokenPayload: TokenPayload, secret: string, options?: jwt.SignOptions): string =>
    jwt.sign(tokenPayload, secret, {
        ...options,
        algorithm: 'HS256'
    })

export const verifyToken = (token: string, secret: string) => jwt.verify(token, secret) as ExtendedJWTPayload | null

export const createTokens = (tokenPayload: ExtendedJWTPayload) => {
    const token = generateToken(tokenPayload, JWT_SECRET)
    const refreshToken = generateToken(tokenPayload, JWT_REFRESH_SECRET, { expiresIn: '7d' })
    return { token, refreshToken }
}
