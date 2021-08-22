import * as BirthController from '@controllers/Birth.controller'
import { Router } from 'express'

const BirthRouter = Router()

BirthRouter.get('/', BirthController.getBirths)
BirthRouter.get('/:id', BirthController.getBirth)
BirthRouter.post('/:id', BirthController.updateBirth)
BirthRouter.delete('/:id', BirthController.deleteBirth)

export default BirthRouter
