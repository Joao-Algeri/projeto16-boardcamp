import { db } from '../database/db.js'
import dayjs from 'dayjs'

export async function getRentals(req, res) {
    try {
        const { rows } = await db.query(`select r.*, c.id AS cid, c.name as cname,g.id as gid, g.name as gname from rentals as r join customers as c
      on r."customerId" = c.id join games as g on r."gameId" = g.id`)

        const results = rows.map(({ cid, cname, gid, gname, ...rental }) => {
            return {
                ...rental, customer: { id: cid, name: cname }, game: { id: gid, name: gname }
            }
        })

        res.send(results)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function insertRental(req, res) {
    const { customerId, gameId, daysRented, pricePerDay } = res.locals.rental

    try {
        const originalPrice = daysRented * pricePerDay

        await db.query(`insert into rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
    values ($1, $2, $3, $4, null, $5, null);`, [customerId, gameId, dayjs().format('YYYY-MM-DD'), daysRented, originalPrice])

        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function finishRental(req, res) {
    const { returnDate, delayFee, id } = res.locals.rental

    await db.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3`,[returnDate, delayFee, id])

    res.sendStatus(200)

    try {

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function deleteRentals(req, res) {
    const { id } = req.params
    try {
        const { rows, rowCount } = await db.query('select * from rentals whete id=$1', [id])

        if (rowCount === 0) return res.sendStatus(404)
        if (!rows[0].returnDate) return res.sendStatus(400)

        await db.query("delete from rentals where id=$1", [id])

        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error.message)
    }

}