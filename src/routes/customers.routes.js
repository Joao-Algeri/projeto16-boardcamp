import { Router } from 'express'
import { insertCustomer, getCustomers, getCustomersId} from '../controllers/customers.controller.js'
import { validateCustomer } from '../middlewares/customers.middleware.js'

const customerRouter = Router()

customerRouter.get('/customers', getCustomers)
customerRouter.get('/customers/:id', getCustomersId)
customerRouter.post('/customers', validateCustomer, insertCustomer)


export default customerRouter