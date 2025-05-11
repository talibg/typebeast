import process from 'node:process'

export const PORT = process.env.PORT
export const JWT_SECRET = process.env.JWT_SECRET!
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!
