import { Router } from 'express'
import { insertGames, getGames } from '../controllers/games.controller.js'
import { validateGame } from '../middlewares/games.middleware.js'

const gamesRouter = Router()

gamesRouter.get('/games', getGames)
gamesRouter.post('/games', validateGame, insertGames)

export default gamesRouter