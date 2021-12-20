import { FastifyInstance } from "fastify";

interface ProductParams {
    id: number
    nombre: string
    marca: string
    tipo: number
    PVP: number
    cantidad?: number
}

export default async function productController(fastify:FastifyInstance) {
    
    fastify.post<{Body: ProductParams}>('/',async function (request,reply) {

    })

}