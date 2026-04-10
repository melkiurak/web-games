import Fastify from 'fastify';
import gameRoutes from './routes/gamesRoutes.js';
import { prisma } from './database/client.js';

const fastify = Fastify({
    logger: true
});

fastify.register(gameRoutes);

const start = async () => {
    try {
        await prisma.$connect();
        fastify.log.info('Database connected successfully');

        await fastify.listen({ port: 3001, host: '0.0.0.0' });
    } catch (er) {
        fastify.log.error(er);
        process.exit(1);
    }
};

start();