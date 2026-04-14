import { Router } from "express"
import { prisma } from "../database/client";

const gameRouter = Router();

gameRouter.get('/games',  async(req, res) => {
    try{
        const upcoming = req.query.upcoming === 'true'
        const nowDate = new Date();
        const lastId = req.query.lastId;
        const games = await prisma.game.findMany({
            where: {
                date: upcoming ? {gt: nowDate} : undefined
            },
            take: 10,
            skip: lastId ? 1 : 0,
            cursor: lastId ? {
                id: Number(lastId),
            } : undefined,
            orderBy: {
                date: 'asc'
            }
        })
        res.json(games)
    } catch (error) {
        console.log('Error to get the data:', error)
        res.status(500).json()
    }
})

export default gameRouter