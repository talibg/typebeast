import { type Request, type Response, type NextFunction } from 'express'
import { HttpError } from '../lib/http-error.ts'

export const requireAuth = (_req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user.role !== 'admin') throw new HttpError('Unauthorised', 401)
    next()
}
