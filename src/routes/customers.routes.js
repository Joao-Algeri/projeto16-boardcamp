import { Router } from 'express'
import {  getCustomers, getCustomersId } from '../controllers/customers.controller.js'


const customerRouter = Router()

customerRouter.get('/customers', getCustomers)
customerRouter.get('/customers/:id', getCustomersId)


export default customerRouter