import { db } from '../database/db.js'
import { gameSchema } from '../schemas/games.schema.js'

export async function validateGame(req, res, next) {
  const game = req.body

  const { error } = gameSchema.validate(game)

  if (error) {
    const err= error.details.map((detail) => detail.message)
    return res.status(400).send({ err })
  }

  const gameExists = await db.query('SELECT * FROM games WHERE name=$1', [game.name])

  if (gameExists.length !== 0) return res.sendStatus(409)

  res.locals.game = game

  next()
}