import express from "express"
import { createGame } from "../controllers/gamesController";

const router = express.Router();
router.post('/games', createGame )

export default router;