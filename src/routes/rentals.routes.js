import { Router } from 'express'
import { insertRental, getRentals, finishRental, deleteRentals } from '../controllers/rentals.controller.js'
import { validateRental } from '../middlewares/rentals.middleware.js'
import { rentalFinish } from '../middlewares/rentalFinish.middleware.js'

const rentalsRouter = Router()

rentalsRouter.get('/rentals', getRentals)
rentalsRouter.post('/rentals', validateRental, insertRental)
rentalsRouter.post('/rentals/:id/return', rentalFinish, finishRental)
rentalsRouter.delete('/rentals/:id', deleteRentals)

export default rentalsRouter