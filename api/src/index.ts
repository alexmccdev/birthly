import * as express from 'express'

const setupMiddleware = (app: express.Express) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
}

const startServer = async () => {
    const app = express()

    setupMiddleware(app)

    app.get('/', (_req, res) => res.send(`Hello from ${process.env.SITE_NAME}! 👶`))

    app.listen(process.env.PORT, () => console.log(`Server ready at: http://localhost:${process.env.PORT}`))
}

startServer()
