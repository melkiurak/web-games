import { prisma } from "../src/database/client";

async function main() {
    try{
        const allGame = await prisma.game.findMany({ take: 10 })
        for(const game of allGame) {
            await prisma.game.update({
                where: {id: game.id},
                data: {
                    comments:{
                        create:{
                            text: 'Text new comment'
                        }
                    }
                }
            })
        }
    } catch(error) {
        console.log(error)
    }
}
main();