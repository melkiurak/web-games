import { GameQuery, gameSchema } from "../schemas/game.schema.js";
import { GameService } from "../services/game.service.js";
import { Request, Response } from "express";

export class GameController {
    private gameService: GameService
    
    constructor() {
        this.gameService = new GameService();
    }

    public getGames = async (req: Request, res: Response): Promise<void> => {
        try{
            const parse = gameSchema.safeParse(req.query)
            if(!parse.success) {
                res.status(400).json(parse.error.format());
                return
            }
            const games = await this.gameService.getFilteredGames(parse.data as GameQuery)
            res.json(games)
        } catch(error) {
            console.error('Error to get the game:', error);
            res.status(500).json({error: 'Internal Server Error'})
        }
    }
    public getMetadata = async(req: Request, res: Response): Promise<void> => {
        try{
            const metadata = await this.gameService.getGamesMetadata()
            res.json(metadata)
        } catch(error) {
            console.error('Error to get the metadata', error)
            res.status(500).json({error: 'Internal Server Error'})
        }
    }
}