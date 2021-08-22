import * as BirthController from '@controllers/Birth.controller'
import { Router } from 'express'

const BirthRouter = Router()

BirthRouter.get('/', BirthController.births)
BirthRouter.get('/:id', BirthController.birth)

export default BirthRouter
