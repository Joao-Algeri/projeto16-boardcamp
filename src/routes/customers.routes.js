import { Router } from 'express'
import { insertCustomer, getCustomers, getCustomersId, updateCustomer } from '../controllers/customers.controller.js'
import { validateCustomer } from '../middlewares/customers.middleware.js'

const customersRouter = Router()

customersRouter.get('/customers', getCustomers)
customersRouter.get('/customers/:id', getCustomersId)
customersRouter.post('/customers', validateCustomer, insertCustomer)
customersRouter.put('/customers/:id', validateCustomer, updateCustomer)

export default customersRouter