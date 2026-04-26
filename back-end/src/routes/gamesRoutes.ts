import { Router } from "express"
import { prisma } from "../database/client";
import { gameSchema } from "../schemas/game.schema";
import { Prisma } from "@prisma/client";
import { keyof } from "zod";

const gameRouter = Router();

gameRouter.get('/games',  async(req, res) => {
    try{
        let where: Prisma.GameWhereInput = {} 
        let orderBy: Prisma.GameOrderByWithRelationInput = { id: 'asc'}

        const {genres, platforms } = req.query 
        const filters = [genres, platforms];
        const nowDate = new Date();
        const parse =  gameSchema.safeParse(req.query);
        const genreMap:Record<string, string> = {
            RPG: "Role-playing (RPG)",
            RTS: "Real Time Strategy (RTS)",
            TBS: "Turn-based strategy (TBS)",
        }
        const platformsMap: Record<string, string> = {
            PC: "PC (Microsoft Windows)",
        }
        const filterObj = {
            genres: {
                value: genres,
                map: genreMap,
                field: 'genres' as const,
            },
            platforms: {
                value: platforms,
                map: platformsMap,
                field: 'platforms' as const
            }
        }

        if(!parse.success){
            return res.status(400).json(parse.error.format())
        }

        type ViewPresentKey = keyof typeof VIEW_PRESETS;
        const VIEW_PRESETS = {
            mostPopular: {
                where: { metaScore: { gte: 90}},
                orderBy: {metaScore: 'desc' as const}
            },
            upcoming: {
                where: {date: {gt: nowDate}},
                orderBy: {date: 'asc' as const},
            },
            trending: () =>  {
                const limit = new Date();
                limit.setMonth(limit.getMonth() - 12);
                return {
                    where: {date: {gt: limit, lt: nowDate}, metaScore: {gte: 80}},
                    orderBy: {metaScore: 'desc' as const}
                } 
            },
            gameMoth: () => {
                const startOfMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1);
                const endOfMonth = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0);
                return {
                    where: {date: {gt: startOfMonth, lt: endOfMonth}, metaScore: {gte: 80}},
                    orderBy: {metaScore: 'desc' as const}
                }
            }
        };
        const activeKey = Object.keys(VIEW_PRESETS).find((key): key is ViewPresentKey => parse.data[key as ViewPresentKey])
        
        if(activeKey) {
            const present = VIEW_PRESETS[activeKey];
            const appliedPreset = typeof present === 'function' ? present() : present

            where = {...where, ...appliedPreset.where}
            orderBy = appliedPreset.orderBy;

        }
        for (let key in filterObj) {
            const filter = filterObj[key as keyof typeof filterObj]
            if(!filter.value) continue;
            const arr = Array.isArray(filter.value) ? filter.value.map(v => String(v)) : [String(filter.value)]
            const filterArr = arr.map(arr => filter.map[arr] || arr);
            where[filter.field  ] = {
                some: {
                    name: {
                        in: filterArr
                    }
                }
            }
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