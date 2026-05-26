import { Router } from "express"
import { GameController } from "../controllers/game.controller.js";
import { validatePage } from "../middlewares/validatePage.js";

const gameRouter = Router();
const gameController = new GameController();

gameRouter.get('/game', validatePage, gameController.getGames)
gameRouter.get('/metadata', gameController.getMetadata);

export default gameRouter