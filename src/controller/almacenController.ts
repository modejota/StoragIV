import { FastifyInstance } from "fastify";
import { Constantes as C} from '../constantes';


const ProductData = {
    type: 'object',
    required: ['id','nombre','marca','tipo','PVP'],
    properties: {
        id: { type: 'number', minimum: C.ID_INVALIDO+1},
        nombre: { type: 'string', minLength: C.LON_NOMBRE_MIN, maxLength: C.LON_NOMBRE_MAX},
        marca: { type: 'string', minLength: C.LON_MARCA_MIN, maxLength: C.LON_NOMBRE_MAX},
        tipo: { type: 'number', minimum: C.ID_INVALIDO},
        PVP: {type: 'number', minimum: C.ID_INVALIDO},
        cantidad: {type: 'number', minimum: C.ID_INVALIDO}
    },
}

export default async function almacenController(fastify:FastifyInstance) {
    
    fastify.route({
        method: 'POST',
        url: '/',
        schema: {
            body: ProductData,
            response: {
                201: ProductData
            }
        },
        handler: function (request,reply) {
            // TO DO
        }
    })

    fastify.get('/',async function (request, reply) {
        
    })

    fastify.get('/:id',async function (request, reply) {
        
    })

    fastify.delete('/:id',async (request, reply) => {
        
    })

    fastify.put('/:id',async (request, reply) => {
        
    })

    fastify.get('/size',async (request, reply) => {

    })

}