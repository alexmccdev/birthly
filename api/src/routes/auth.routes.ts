import * as AuthController from '@controllers/auth.controller'
import { Router } from 'express'

const AuthRouter = Router()

AuthRouter.post('/login', AuthController.login)
AuthRouter.get('/register', AuthController.register)
AuthRouter.get('/logout', AuthController.logout)
AuthRouter.post('/refreshToken', AuthController.refreshToken)

export default AuthRouter
