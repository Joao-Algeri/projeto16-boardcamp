import { Router } from 'express'
import { create, getAll } from '../controllers/games.controller.js'
import { validateGame } from '../middlewares/games.middleware.js'

const gameRouter = Router()

gameRouter.get('/games', getAll)
gameRouter.post('/games', validateGame, create)

export default gameRouter