require('module-alias/register') // enables @middleware, @routes, etc. notation for imports

import { authHandler } from '@middleware/auth.middleware'
import { errorHandler } from '@middleware/error.middleware'
import AuthRouter from '@routes/v1/auth.routes'
import BirthRouter from '@routes/v1/birth.routes'
import UserRouter from '@routes/v1/user.routes'
import * as cors from 'cors'
import * as express from 'express'
import * as rateLimit from 'express-rate-limit'

const setupMiddleware = (app: express.Express) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())
    app.use(
        rateLimit({
            windowMs: process.env.RATE_LIMIT_WINDOW_LENGTH,
            max: process.env.RATE_LIMIT_MAX, // limit each IP to x requests per windowMs
        })
    )
}

const setupRoutes = (app: express.Express) => {
    const v1 = express.Router()

    v1.use('/auth', AuthRouter)
    v1.use('/births', authHandler, BirthRouter)
    v1.use('/users', authHandler, UserRouter)
    v1.get('/', (_req, res) => res.send(`Hello from ${process.env.SITE_NAME}! 👶`))

    app.use(process.env.BASE_URL, v1)
}

const setupErrorHandling = (app: express.Express) => {
    app.use(errorHandler)
}

const createServer = () => {
    const app = express()

    setupMiddleware(app)
    setupRoutes(app)
    setupErrorHandling(app)

    return app
}

const startServer = () => {
    const app = createServer()

    app.listen(process.env.SERVER_PORT, () =>
        console.log(
            `Server ready at: ${process.env.SERVER_PROTOCOL}://${process.env.SERVER_IP}:${process.env.SERVER_PORT}${process.env.BASE_URL}`
        )
    )
}

startServer()

export default createServer
