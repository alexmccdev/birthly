import * as AuthController from '@controllers/v1/auth.controller'
import { authHandler } from '@middleware/auth.middleware'
import { Router } from 'express'

const AuthRouter = Router()

AuthRouter.post('/login', AuthController.login)
AuthRouter.post('/register', AuthController.register)
AuthRouter.post('/logout', authHandler, AuthController.logout)
AuthRouter.post('/token', AuthController.token)
AuthRouter.get('/verify-email', AuthController.verifyEmail)
AuthRouter.post('/forgot-password', AuthController.forgotPassword)
AuthRouter.post('/reset-password', AuthController.resetPassword)

export default AuthRouter
