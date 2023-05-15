import { db } from '../database/db.js'
import dayjs from 'dayjs'

export async function rentalFinish(req, res, next) {
    const { id } = req.params

    let rental = await db.query('SELECT * FROM rentals WHERE id=$1', [id])
    rental = rental.rows[0]

    if (!rental) return res.sendStatus(404)

    if (rental.returnDate) return res.sendStatus(400)

    const returnDate = dayjs().format('YYYY-MM-DD')
    const expirationDate = dayjs(rental.rentDate, 'day').add(rental.daysRented, 'day')

    const diffDays = dayjs().diff(expirationDate, 'day')

    let feeValue

    if (diffDays > 0) feeValue = diffDays * (rental.originalPrice / rental.daysRented)

    res.locals.rental = { returnDate, feeValue, id }

    next()
}