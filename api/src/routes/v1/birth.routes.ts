import * as BirthController from '@controllers/v1/Birth.controller'
import { Router } from 'express'

const BirthRouter = Router()

BirthRouter.get('/', BirthController.getBirths)
BirthRouter.post('/', BirthController.createBirth)
BirthRouter.get('/:id', BirthController.getBirth)
BirthRouter.post('/:id', BirthController.updateBirth)
BirthRouter.delete('/:id', BirthController.deleteBirth)

export default BirthRouter
