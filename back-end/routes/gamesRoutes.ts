import express from "express"
import { createGame } from "../controllers/gamesController";
import { checkRequiremets } from "../controllers/checkRequiremets";

const router = express.Router();
router.post('/games', createGame )
router.post('/games/compare', checkRequiremets )

export default router;