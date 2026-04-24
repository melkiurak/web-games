import { Router } from "express"
import { prisma } from "../database/client";
import { gameSchema } from "../schemas/game.schema";
import { Prisma } from "@prisma/client";

const gameRouter = Router();

gameRouter.get('/games',  async(req, res) => {
    try{
        const {genres} = req.query
        let where: Prisma.GameWhereInput = {} 
        let orderBy: Prisma.GameOrderByWithRelationInput = { id: 'asc'}
        const parse =  gameSchema.safeParse(req.query)
        
        if(!parse.success){
            return res.status(400).json(parse.error.format())
        }

        const nowDate = new Date();
        if(parse.data.upcoming) {
            where.date = { gt: nowDate };
            orderBy = {date: 'asc'}
        } else if (parse.data.mostPopular) {
            where.metaScore = { gte: 90 };
            orderBy = {metaScore: 'desc'}
        } else if (parse.data.trending) {
            const trendingLimit = new Date();
            trendingLimit.setMonth(trendingLimit.getMonth() - 12);
            where.date = {gt:trendingLimit, lt:nowDate}
            where.metaScore = {gte: 80}
            orderBy = {metaScore: 'desc'}
        } else if (parse.data.gameMoth) {
            const startOfMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1);
            const endOfMonth = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0);
            where.date = {gt:startOfMonth, lt:endOfMonth}
            where.metaScore = {gte: 80}
            orderBy = {metaScore: 'desc'}
        }

        if (genres) {
            const genreArray = Array.isArray(genres) ? genres.map(g => String(g)): [String(genres)];
            where.genres = {
                some: {
                    name: {
                        in: genreArray,
                    },
                },
            };
        }
        const games = await prisma.game.findMany({
            where,
            take: parse.data.take,
            skip: parse.data.lastId ? 1 : 0,
            cursor: parse.data.lastId ? {
                id: parse.data.lastId,
            } : undefined,
            include:{
                genres: true, 
                platforms: true,
            },
            orderBy
        });
        const formatedGames = games.map(game => ({
            ...game,
            genres: game.genres.map(g => g.name),
            platforms: game.platforms.map(p => p.name)
        }))
        res.json(formatedGames)
    } catch (error) {
        console.log('Error to get the data:', error)
        
        res.status(500).json()
    }
})

export default gameRouter