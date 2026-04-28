import { Router } from "express"
import { prisma } from "../database/client";
import { gameSchema } from "../schemas/game.schema";
import { Prisma } from "@prisma/client";
import { file, keyof, number } from "zod";

const gameRouter = Router();
gameRouter.get('/games',  async(req, res) => {
    try{
        let where: Prisma.GameWhereInput = {} 
        let orderBy: Prisma.GameOrderByWithRelationInput = { id: 'asc'}
        
        const {genres, platforms, publishers, categories, metaScore, date, price, online} = req.query 

        const nowDate = new Date();
        const parse =  gameSchema.safeParse(req.query);
        const conditions: any[] = []

        const genreMap:Record<string, string> = {
            RPG: "Role-playing (RPG)",
            RTS: "Real Time Strategy (RTS)",
            TBS: "Turn-based strategy (TBS)",
        }
        const platformsMap: Record<string, string> = {
            PC: "PC (Microsoft Windows)",
        }
        type FilterType = {
            value: any;
            field: 'genres' | 'platforms' | 'publishers' | 'categories' | 'metaScore' | 'date' | 'price' | 'online' ;
            map?: Record<string, string>;
        }
        const filterObj: Record<string, FilterType> = {
            genres: {
                value: genres,
                map: genreMap,
                field: 'genres' as const,
            },
            platforms: {
                value: platforms,
                map: platformsMap,
                field: 'platforms' as const,
            },
            publishers: {
                value: publishers,
                field: 'publishers' as const,
            },
            categories: {
                value: categories,
                field: 'categories' as const,
            },
            metaScore: {
                value: metaScore,
                field: 'metaScore' as const,
            },
            date: {
                value: date,
                field: 'date' as const,
            },
            priсe: {
                value: price,
                field: 'price' as const,
            },
            online: {
                value: req.query.online,
                field: 'online' as const,
            }
        }

        if(!parse.success){
            return res.status(400).json(parse.error.format())
        }
        const staticPresets = {
            mostPopular: {
                where: { metaScore: { gte: 90}},
                orderBy: {metaScore: 'desc' as const}
            },
            upcoming: {
                where: {date: {gt: nowDate}},
                orderBy: {date: 'asc' as const},
            }
        }
        const dynamicPresets = {
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
        }
        const VIEW_PRESETS = {
            ...staticPresets,
            ...dynamicPresets
        };
        type ViewPresentKey = keyof typeof VIEW_PRESETS;
        const activeKey = Object.keys(VIEW_PRESETS).find((key): key is ViewPresentKey => parse.data[key as ViewPresentKey])
        
        if(activeKey) {
            const present = VIEW_PRESETS[activeKey];
            const appliedPreset = typeof present === 'function' ? present() : present

            where = {...where, ...appliedPreset.where}
            orderBy = appliedPreset.orderBy;

        }
        const сollectionFilters = (field: "genres" | "platforms" | "publishers" | "categories", values: string[] ) => {
            return {
                OR: values.map(value => ({
                    [field]:{ 
                        some: {
                            name: {
                                contains: value,
                                mode: "insensitive"
                            }
                        }
                    }
                }))
            }
        }
        const rangeFilters = (field: string, min: number, max: number ) => {
            return {
                [field]: {
                    gte: min,
                    lte: max
                }
            }
        }
        const dateFilter = (field: string, year: number) => {
            return {
                [field]: {
                    gte: new Date(`${year}-01-01`),
                    lte: new Date(`${year}-12-31T23:59:59`)
                }
            }
        }
        for (let key in filterObj) {
            const filter = filterObj[key as keyof typeof filterObj]
            if(!filter.value) continue;

            if(filter.field === 'metaScore') {
                const numValue = Number(Array.isArray(filter.value) ? filter.value[0] : filter.value)

                const minRange = numValue * 10
                const maxRenge = (numValue * 10) + 9

                conditions.push(rangeFilters(filter.field, minRange, maxRenge))
            } else if(filter.field === 'date') {
                const yearBase = Number(filter.value);
                conditions.push(dateFilter(filter.field, yearBase))
            }  else if(filter.field === 'price') {                
                filter.value && conditions.push({price: 0} )
            } else if(filter.field === 'online') {
                const onlineKeywords = ['Multi-player','Online','PvP','MMO','Multiplayer'];
                filter.value &&  conditions.push(сollectionFilters('categories', onlineKeywords))
            }
            else {
                const arr = Array.isArray(filter.value) ? filter.value.map(v => String(v)) : [String(filter.value)]
                const filterArr = arr.map(arr => filter.map?.[arr] || arr);
                conditions.push(сollectionFilters(filter.field, filterArr),)
            }
        }
        where = {
            ...where,
            AND: conditions
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