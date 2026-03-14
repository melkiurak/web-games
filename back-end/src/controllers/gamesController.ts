import { prisma } from "../server"

export const getGames = async (req:any, res:any) => {
    const games = await prisma.game.findMany({ take: 5 });
    console.log(games)
    res.json(games);
}