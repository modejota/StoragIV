import { FastifyInstance } from "fastify";
import { handler } from "../handler";
import { ConstantesValidacion as CV } from "../constantes/constantesValidacion";
import { Tipo_producto } from "../models/tipo_producto";
import { logger } from "../logger";

export default async function almacenController(fastify:FastifyInstance) {
    
    fastify.route({
        method: 'POST',
        url: '/',
        schema: {
            body: CV.ProductData
        },
        handler: async function (request,reply) {
            let data = JSON.parse(JSON.stringify(request.body))
            if(data.tipo > Tipo_producto.UNDEFINED)
                data.tipo = Tipo_producto.UNDEFINED
            try {
                let product = handler.crear_producto(data.id, data.nombre, data.marca, data.tipo, data.PVP)
                handler.aniadir_producto_almacen(product,data.cantidad)
                reply.header('Location',`/products/${data.id}`)
                reply.status(201).send({result: `Product with ID ${data.id} added successfully to storage.`})
                logger.info(`Product with ID ${data.id} added successfully to storage.`)
            } catch {
                let product = handler.crear_producto(data.id, data.nombre, data.marca, data.tipo, data.PVP)
                handler.actualizar_producto_almacen(product,data.cantidad)
                reply.status(200).send({result: `Product with ID ${data.id} updated successfully.`})
                logger.info(`Product with ID ${data.id} updated successfully.`)
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
                logger.error(`HTTP404. Product with ID ${data.id} not found.`)
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
                logger.info(`Product with ID ${data.id} deleted successfully.`)
            } catch {
                reply.status(404).send({error: `Product with ID ${data.id} not found.`})
                logger.error(`HTTP404. Product with ID ${data.id} not found.`)
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
                handler.actualizar_producto_almacen(product,data.cantidad)
                reply.code(200).send({result: `Product with ID ${ID} updated successfully.`})
                logger.info(`Product with ID ${ID} updated successfully.`)
            } catch {
                let product = handler.crear_producto(ID, data.nombre, data.marca, data.tipo, data.PVP)
                handler.aniadir_producto_almacen(product,data.cantidad)
                reply.header('Location',`/products/${ID}`)
                reply.code(201).send({result: `Product with ID ${ID} created successfully.`})
                logger.info(`Product with ID ${ID} created successfully.`)
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
                logger.error(`HTTP404. Product with ID ${ID} not found.`)
            }
        }
    })

}