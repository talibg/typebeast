import database from '@typebeast/database'
import { type Request, type Response, type NextFunction } from 'express'
import { JWT_SECRET } from '../utils/constants.ts'
import { verifyToken } from '../utils/jwt.ts'

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization
    if (!accessToken) {
        next()
        return
    }
    const token = accessToken.split(' ')[1]
    const decoded = verifyToken(token, JWT_SECRET)
    if (!decoded) {
        next()
        return
    }
    const user = await database.user.findUnique({
        where: { id: decoded.uid },
        omit: { password: true }
    })
    if (!user) {
        next()
        return
    }
    res.locals.user = user
    next()
}
