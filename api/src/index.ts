require('module-alias/register')

import * as express from 'express'
import AuthRouter from '@routes/auth.routes'

const setupMiddleware = (app: express.Express) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
}

const setupRoutes = (app: express.Express) => {
    app.use('/auth', AuthRouter)
    app.get('/', (_req, res) => res.send(`Hello from ${process.env.SITE_NAME}! 👶`))
}

const startServer = async () => {
    const app = express()

    setupMiddleware(app)
    setupRoutes(app)

    app.listen(process.env.PORT, () => console.log(`Server ready at: http://localhost:${process.env.PORT}`))
}

startServer()
