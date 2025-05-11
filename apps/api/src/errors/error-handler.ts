import { z } from 'zod'
import { HttpError } from '../lib/http-error.ts'
import { logger } from '../utils/logger.ts'
import type { ErrorRequestHandler } from 'express'

type ErrorResponseBodyDetails = {
    field: string
    message: string
}

type ErrorResponseBody = {
    status: string
    message: string
    details: ErrorResponseBodyDetails[] | null
}
export const errorHandler: ErrorRequestHandler = (err, _req, res, _) => {
    let statusCode = 500
    let responseBody: ErrorResponseBody = {
        status: 'error',
        message: 'Internal Server Error',
        details: null
    }

    if (err instanceof HttpError) {
        logger.error(err)
        const { message } = err
        statusCode = err.statusCode
        responseBody.message = message
    }

    if (err instanceof z.ZodError) {
        logger.error(err)
        statusCode = 400
        responseBody.message = 'Validation failed'
        responseBody.details = err.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
        }))
    }

    // TODO: handle error type + prisma errors
    if (err instanceof Error) logger.error(err)
    if (err instanceof ReferenceError) logger.error(err)
    if (err instanceof TypeError) logger.error(err)

    logger.error(responseBody)
    res.status(statusCode).json(responseBody)
}
