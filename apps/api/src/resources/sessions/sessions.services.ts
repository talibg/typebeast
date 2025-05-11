import database from '@typebeast/database'

export const createSessionsService = async (token: string, userId: number) => {
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 7)
    const session = await database.session.create({
        data: { token, userId, expiryDate }
    })
    return session
}

export const fetchSessionsService = async (token: string, userId: number) => {
    const session = await database.session.findFirst({ where: { token, userId } })
    return session
}

export const updateSessionsService = async (refreshToken: string, token: string, userId: number) => {
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 7)
    const session = await database.session.update({
        where: { token: refreshToken, userId },
        data: { token, userId, expiryDate }
    })
    return session
}

export const deleteSessionsService = async (token: string) => {
    const session = await database.session.deleteMany({ where: { token } })
    return session
}
