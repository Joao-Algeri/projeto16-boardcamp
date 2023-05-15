import { Router } from 'express'
import { insertGames, getGames } from '../controllers/games.controller.js'
import { validateGame } from '../middlewares/games.middleware.js'

const gameRouter = Router()

gameRouter.get('/games', getGames)
gameRouter.post('/games', validateGame, insertGames)

export default gameRouter