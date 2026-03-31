import Fastify from 'fastify';
import gameRoutes from './routes/gamesRoutes';


const fastify = Fastify({
    logger: true
})
const server = async() => {
    try{
       await fastify.listen({port:3001})
    } catch(er) {
        fastify.log.error(er)
        process.exit(1)
    }
}
fastify.register(gameRoutes)
server()