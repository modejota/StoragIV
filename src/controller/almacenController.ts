import { FastifyInstance } from "fastify";
import { handler } from "../handler";
import { ConstantesValidacion as CV } from "../constantes/constantesValidacion";

export default async function almacenController(fastify:FastifyInstance) {
    
    fastify.route({
        method: 'POST',
        url: '/',
        schema: {
            body: CV.ProductData
        },
        handler: async function (request,reply) {
            let data = JSON.parse(JSON.stringify(request.body))
            try {
                let product = handler.crear_producto(data.id, data.nombre, data.marca, data.tipo, data.PVP)
                handler.aniadir_producto_almacen(product,data.cantidad)
                reply.status(201).send({result: "Product added successfully to storage."})
            } catch {
                reply.status(500).send({error: `Product with ID ${data.id} already existing. Can't create.`})
            }
        }
    })

    fastify.route({
        method: 'GET',
        url: '/',
        handler: async function (request, reply) {
            const result = Object.fromEntries(handler.get_all_productos_almacen())
            reply.status(200).send(result)
        }
    })

    fastify.route({
        method: 'GET',
        url: '/:id',
        schema: {
            params: CV.ProductID
        },
        handler: async function (request, reply) {
            let data = JSON.parse(JSON.stringify(request.params))
            try {
                let product = handler.obtener_producto_almacen(data.id)
                reply.code(200).send(product)
            } catch {
                reply.status(404).send({error: `Product with ID ${data.id} not found.`})
            }
        }
    })

    fastify.route({
        method: 'DELETE',
        url: '/:id',
        schema: {
            params: CV.ProductID
        },
        handler: async function (request, reply) {
            let data = JSON.parse(JSON.stringify(request.params))
            try {
                handler.eliminar_producto_almacen(data.id)
                reply.code(200).send({result: `Product with ID ${data.id} deleted successfully.`})
            } catch {
                reply.status(404).send({error: `Product with ID ${data.id} not found.`})
            }
        }
    })

    fastify.route({
        method: 'PUT',
        url: '/:id',
        schema: {
            params: CV.ProductID,
            body: CV.ModifyingProductData
        },
        handler: async function (request, reply) {
            let ID = JSON.parse(JSON.stringify(request.params)).id
            let data = JSON.parse(JSON.stringify(request.body))
            try {
                let product = handler.crear_producto(ID, data.nombre, data.marca, data.tipo, data.PVP)
                handler.eliminar_producto_almacen(ID)
                handler.aniadir_producto_almacen(product,data.cantidad)
                reply.code(200).send({result: `Product with ID ${ID} updated successfully.`})
            } catch {
                reply.code(404).send({error: `Product with ID ${ID} not found.`})
            }
        }
    })

    fastify.route({
        method: 'PATCH',
        url: '/:id',
        schema: {
            params: CV.ProductID,
            body: CV.QuantityOfAProductData
        },
        handler: async function (request, reply) {
            let ID = JSON.parse(JSON.stringify(request.params)).id
            let new_c = JSON.parse(JSON.stringify(request.body)).cantidad
            try {
                handler.actualizar_cantidad_producto_almacen(ID,new_c)
                reply.code(200).send({result: `Quantity of product with ID ${ID} updated successfully.`})
            } catch {
                reply.code(404).send({error: `Product with ID ${ID} not found.`})
            }
        }
    })

}