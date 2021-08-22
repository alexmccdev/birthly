require('module-alias/register') // enables @middleware, @routes, etc. notation for imports

import { authHandler } from '@middleware/auth.middleware'
import { errorHandler } from '@middleware/error.middleware'
import AuthRouter from '@routes/auth.routes'
import BirthRouter from '@routes/birth.routes'
import * as express from 'express'

const setupMiddleware = (app: express.Express) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
}

const setupRoutes = (app: express.Express) => {
    app.use('/auth', AuthRouter)
    app.use('/births', authHandler, BirthRouter)

    // Sample routes
    app.get('/protected', authHandler, (_req, res) => res.send(`🔓 Valid access token!`))
    app.get('/', (_req, res) => res.send(`Hello from ${process.env.SITE_NAME}! 👶`))
}

const setupErrorHandling = (app: express.Express) => {
    app.use(errorHandler)
}

const startServer = async () => {
    const app = express()

    setupMiddleware(app)
    setupRoutes(app)
    setupErrorHandling(app)

    app.listen(process.env.PORT, () => console.log(`Server ready at: http://localhost:${process.env.PORT}`))
}

startServer()
