import * as AuthController from '@controllers/auth.controller'
import { Router } from 'express'

const AuthRouter = Router()

AuthRouter.post('/login', AuthController.login)
AuthRouter.get('/register', AuthController.register)
AuthRouter.post('/logout', AuthController.logout)
AuthRouter.post('/token', AuthController.token)
AuthRouter.get('/verify/:token', AuthController.verify)

export default AuthRouter
