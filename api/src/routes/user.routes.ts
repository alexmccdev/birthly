import * as UserController from '@controllers/User.controller'
import { Router } from 'express'

const UserRouter = Router()

UserRouter.get('/', UserController.getUser)

export default UserRouter
