import { db } from '../database/db.js'

export async function getGames(req, res) {
  try {
    const games = await db.query('SELECT * FROM games')

    res.send(games.rows)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function insertGames(req, res) {
  const { name, image, stockTotal, pricePerDay } = res.locals.game

  try {
    await db.query(`
    INSERT INTO games (name,"stockTotal","pricePerDay", image ) VALUES ($1, $2, $3, $4);`, [name, stockTotal,pricePerDay, image ])
    res.sendStatus(201)
  } catch (error) {
    res.status(500).send(error.message)
  }
}