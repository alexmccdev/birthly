import * as AuthController from '@controllers/auth.controller'
import { Router } from 'express'

const AuthRouter = Router()

AuthRouter.get('/login', AuthController.login)
AuthRouter.get('/register', AuthController.register)
AuthRouter.get('/logout', AuthController.logout)
AuthRouter.get('/refreshToken', AuthController.refreshToken)

export default AuthRouter
