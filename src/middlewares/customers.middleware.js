import { db } from '../database/db.js'
import { customerSchema } from '../schemas/customers.schema.js'

export async function validateCustomer(req, res, next) {
  const customer = req.body
  const { id } = req.params

  const { error } = customerSchema.validate(customer)

  if (error) {
    const err = error.details.map((detail) => detail.message)
    return res.status(400).send({ err })
  }

  const cpfExists = await db.query('SELECT * FROM customers WHERE cpf=$1', [customer.cpf])

  if (
    cpfExists.length !== 0 &&
    cpfExists.rows[0].id !== Number(id)
  ) {
    return res.sendStatus(409)
  }

  res.locals.customer = id ? { ...customer, id } : customer

  next()
}