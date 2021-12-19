import { FastifyInstance } from "fastify";
import productController from "./controller/productController";
import almacenController from "./controller/almacenController";
import facturaController from "./controller/facturaController";

export default async function router(fastify: FastifyInstance) {

    fastify.register(productController)
    fastify.register(almacenController)
    fastify.register(facturaController)

    fastify.get('/', async (request,reply) => {
        reply.status(200).send({greeting: 'Welcome to storagIV API'});
    })

    fastify.get('/status', async (request,reply) => {
        reply.status(200).send({hello: 'I am live!'});
    })
}