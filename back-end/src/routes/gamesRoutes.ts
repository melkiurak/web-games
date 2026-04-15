import { Router } from "express"
import { prisma } from "../database/client";

const gameRouter = Router();

gameRouter.get('/games',  async(req, res) => {
    try{
        let where: any = {}
        let orderBy
        const {upcoming, mostPopular, trending, lastId, take,} = req.query
        const nowDate = new Date();
        const takeCount = Number(take) || 20;

        if(upcoming) {
            where.date = { gt: nowDate };
            orderBy = {date: 'asc'  as const}
        } else if (mostPopular) {
            where.rating = { gte: 90 };
            orderBy = {rating: 'desc'  as const}
        } else if (trending) {
            const trendingLimit = new Date();
            trendingLimit.setMonth(trendingLimit.getMonth() - 12);
            where.date = {gt:trendingLimit, lt:nowDate}
            where.rating = {gte: 80}
            orderBy = {rating: 'desc' as const}
        } 
        else {
            orderBy = {id: 'asc' as const}
        }


        const games = await prisma.game.findMany({
            where,
            take: takeCount,
            skip: lastId ? 1 : 0,
            cursor: lastId ? {
                id: Number(lastId),
            } : undefined,
            orderBy
        })
        res.json(games)
    } catch (error) {
        console.log('Error to get the data:', error)
        res.status(500).json()
    }
})

export default gameRouter