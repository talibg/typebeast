import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { errorHandler } from './errors/error-handler.ts'
import { deserializeUser } from './middleware/deserialise-user.ts'
import { router } from './routes.ts'
import { PORT } from './utils/constants.ts'
import { logger } from './utils/logger.ts'

const app: typeof express.application = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(helmet())
app.use(morgan('dev'))
app.use(deserializeUser)
app.use('/api/v1/', router)
app.use(errorHandler)

app.listen(PORT, () => {
    logger.info(`Server started on port:${PORT}`)
})

export { app }
