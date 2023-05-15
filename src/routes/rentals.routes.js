import { Router } from 'express'
import { insertRental, getRentals } from '../controllers/rentals.controller.js'
import { validateRental } from '../middlewares/rentals.middleware.js'


const rentalsRouter = Router()

rentalsRouter.get('/rentals', getRentals)
rentalsRouter.post('/rentals', validateRental, insertRental)


export default rentalsRouter