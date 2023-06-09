import { db } from '../database/db.js'

export async function getCustomers(req, res) {
  try {
    const customers = await db.query('SELECT * FROM customers')

    res.send(customers.rows)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function getCustomersId(req, res) {
  const { id } = req.params
  try {
    const customer = await db.query('SELECT * FROM customers WHERE id=$1', [id])
    if (customer.length === 0) return res.sendStatus(404)
    res.send(customer.rows[0])
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function insertCustomer(req, res) {
  const { name, phone, cpf, birthday } = res.locals.customer

  try {
    await db.query(`insert into customers (name, phone, cpf, birthday) values ($1, $2, $3, $4);`, [name, phone, cpf, birthday])

    res.sendStatus(201)
  } catch (error) {
    res.status(500).send(error.message)
  }
}
export async function updateCustomer(req, res) {
  const { name, phone, cpf, birthday, id } = res.locals.customer

  try {
    await db.query(`update customers set name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;`, [name, phone, cpf, birthday, id])

    res.sendStatus(200)
  } catch (error) {
    res.status(500).send(error.message)
  }
}
