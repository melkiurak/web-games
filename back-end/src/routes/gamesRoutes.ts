import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { gameService } from "../services/gameService"

export default async function gameRoutes(fastify:FastifyInstance, options:FastifyPluginOptions) {
    fastify.get('/api-games', async (request, reply) => {
        const result = gameService.getGame();
        return {message: result};
    });
}