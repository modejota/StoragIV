import { FastifyInstance } from "fastify";
export default async function router(fastify: FastifyInstance) {
    
    fastify.get('/status', async (request,reply) => {
        reply.status(201).send({hello: 'I am live!'});
    })
}