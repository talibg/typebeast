import { type Request, type Response, type NextFunction } from 'express'
import { z } from 'zod'

export const validateSchema = (schema: z.AnyZodObject) => (req: Request, _res: Response, next: NextFunction) => {
    schema.parse(req.body)
    next()
}
