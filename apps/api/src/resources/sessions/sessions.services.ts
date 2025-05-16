import database from '@typebeast/database'
import * as argon2 from 'argon2'

export const createSessionsService = async (
    token: string,
    userId: number,
    jti: string,
    userAgent: string,
    ipAddress: string
) => {
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 7)
    const hashedToken = await argon2.hash(token)
    const session = await database.session.create({
        data: { token: hashedToken, userId, expiryDate, jti, userAgent, ipAddress }
    })
    return session
}

export const fetchSessionsService = async (userId: number, jti: string) => {
    const session = await database.session.findFirst({ where: { jti, userId } })
    return session
}

export const updateSessionsService = async (
    token: string,
    userId: number,
    jti: string,
    newJti: string,
    userAgent: string,
    ipAddress: string
) => {
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 7)
    const hashedToken = await argon2.hash(token)
    const session = await database.session.update({
        where: { jti, userId },
        data: { token: hashedToken, userId, expiryDate, jti: newJti, userAgent, ipAddress }
    })
    return session
}

export const deleteSessionsService = async (jti: string) => {
    const session = await database.session.delete({ where: { jti } })
    return session
}
