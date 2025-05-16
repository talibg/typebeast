import database from '@typebeast/database'
import * as argon2 from 'argon2'

export const createUsersService = async (email: string, username: string, password: string) => {
    const hashedPassword = await argon2.hash(password)
    const user = await database.user.create({
        data: { email, username, password: hashedPassword }
    })

    return user
}

export const fetchUsersServiceById = async (id: number) => {
    const user = await database.user.findUnique({ where: { id }, omit: { password: true } })
    return user
}

export const fetchUsersServiceByEmail = async (email: string) => {
    const user = await database.user.findUnique({ where: { email } })
    return user
}

export const fetchUsersServiceByUsername = async (username: string) => {
    const user = await database.user.findUnique({ where: { username } })
    return user
}
