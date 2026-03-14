import express from "express"
import { getGames } from "../controllers/gamesController";

const router = express.Router();
router.get('/games', getGames )

export default router;