import { Router } from "express"
import { GameController } from "../controllers/game.controller.js";

const gameRouter = Router();
const gameController = new GameController();
gameRouter.get('/game', gameController.getGames)
gameRouter.get('/metadata', gameController.getMetadata);

export default gameRouter