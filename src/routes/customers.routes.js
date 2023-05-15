import { Router } from 'express'
import { insertCustomer, getCustomers, getCustomersId, updateCustomer } from '../controllers/customers.controller.js'
import { validateCustomer } from '../middlewares/customers.middleware.js'

const customerRouter = Router()

customerRouter.get('/customers', getCustomers)
customerRouter.get('/customers/:id', getCustomersId)
customerRouter.post('/customers', validateCustomer, insertCustomer)
customerRouter.put('/customers/:id', validateCustomer, updateCustomer)

export default customerRouter