import jwt from 'jsonwebtoken'
import { JWT_REFRESH_SECRET, JWT_SECRET } from './constants.ts'
import type { JwtPayload } from 'jsonwebtoken'

export type TokenPayload = {
    id: number
    email: string
    role: string
}

export interface ExtendedJWTPayload extends JwtPayload {
    userId: number
    email: string
    role: string
}

export const generateToken = (tokenPayload: TokenPayload, secret: string, options?: jwt.SignOptions): string =>
    jwt.sign({ userId: tokenPayload.id, email: tokenPayload.email, role: tokenPayload.role }, secret, {
        ...options,
        algorithm: 'HS256'
    })

export const verifyToken = (token: string, secret: string) => jwt.verify(token, secret) as ExtendedJWTPayload | null

export const createTokens = (id: number, email: string, role: string) => {
    const token = generateToken({ id, email, role }, JWT_SECRET)
    const refreshToken = generateToken({ id, email, role }, JWT_REFRESH_SECRET, { expiresIn: '7d' })
    return { token, refreshToken }
}
