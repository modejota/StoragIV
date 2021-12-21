import { FastifyInstance } from "fastify";
import almacenController from "./controller/almacenController";
import facturaController from "./controller/facturaController";

export default async function router(fastify: FastifyInstance) {

    fastify.register(almacenController, { prefix: '/product' })
    fastify.register(facturaController, { prefix: '/bill' })

    fastify.get('/', async (request,reply) => {
        reply.status(200).send({greeting: 'Welcome to storagIV API'});
    })

    fastify.get('/status', async (request,reply) => {
        reply.status(200).send({hello: 'I am live!'});
    })
}