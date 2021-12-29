import { FastifyInstance } from "fastify";
import { handler } from "../handler";
import { ConstantesValidacion as CV } from "../constantes/constantesValidacion";
import { parseFactura, parseFacturas } from "../parsers";

export default async function facturaController(fastify:FastifyInstance) {
    
    fastify.route({
        method: 'GET',
        url: '/',
        handler: function (request, reply) {
            const result = parseFacturas(handler.get_all_facturas())
            reply.status(200).send(result)
        }
    })
    
    fastify.route({
        method: 'POST',
        url: '/',
        schema: {
            body: CV.BillID 
        },
        handler: function (request, reply) {
            let data = JSON.parse(JSON.stringify(request.body))
            try {
                handler.crear_factura(data.id)
                reply.code(201).send({result: `Bill with ID ${data.id} created successfully.`})
            } catch {
                reply.code(500).send({error: `Bill with ID ${data.id} already existing. Can't create.`})
            }
        }
    })

    fastify.route({
        method: 'GET',
        url: '/:id',
        schema: {
            params: CV.BillID
        },
        handler: function (request, reply) {
            let data = JSON.parse(JSON.stringify(request.params))
            try {
                let bill = handler.obtener_factura(data.id)
                reply.code(200).send(parseFactura(bill))
            } catch {
                reply.status(404).send({error: `Bill with ID ${data.id} not found.`})
            }
        }
    })

    fastify.route({
        method: 'DELETE',
        url: '/:id',
        schema: {
            params: CV.BillID
        },
        handler: function (request, reply) {
            let data = JSON.parse(JSON.stringify(request.params))
            try {
                handler.eliminar_factura(data.id)
                reply.code(200).send({result: `Bill with ID ${data.id} deleted successfully.`})
            } catch {
                reply.status(404).send({error: `Bill with ID ${data.id} not found.`})
            }
        }
    })

    fastify.route({
        method: 'POST',
        url: '/:id',
        schema: {
            params: CV.BillID,
            body: CV.ProductData
        },
        handler: function (request, reply) {
            let id = JSON.parse(JSON.stringify(request.params)).id
            let data = JSON.parse(JSON.stringify(request.body))
            try {
                let product = handler.crear_producto(data.id, data.nombre, data.marca, data.tipo, data.PVP)
                handler.aniadir_producto_factura(id,product,data.cantidad)
                reply.status(201).send({result: `Product added successfully to bill with ID ${id}.`})
            } catch {
                reply.status(500).send({error: `Product with ID ${data.id} already existing in bill with ID ${id}. Can't create.`})
            }
        }
    })

    fastify.route({
        method: 'GET',
        url: '/:id/product/:idp',
        schema: {
            params: CV.ProductOfABillID
        },
        handler: function (request, reply) {
            let params = JSON.parse(JSON.stringify(request.params))
            try {
                let product = handler.obtener_producto_factura(params.id, params.idp)
                reply.code(200).send(product)
            } catch {
                reply.status(404).send({error: "Product and/or bill not found."})
            }
        }
    })

    fastify.route({
        method: 'DELETE',
        url: '/:id/product/:idp',
        schema: {
            params: CV.ProductOfABillID
        },
        handler: function (request, reply) {
            let params = JSON.parse(JSON.stringify(request.params))
            try {
                handler.eliminar_producto_factura(params.id, params.idp)
                reply.code(200).send({result: `Product with ID ${params.idp} deleted successfully from bill with ID ${params.id}.`})
            } catch {
                reply.status(404).send({error: "Product and/or bill not found."})
            }
        }
    })

    fastify.route({
        method: 'PUT',
        url: '/:id/product/:idp',
        schema: {
            params: CV.ProductOfABillID,
            body: CV.ModifyingProductData
        },
        handler: function (request, reply) {
            let params = JSON.parse(JSON.stringify(request.params))
            let data = JSON.parse(JSON.stringify(request.body))
            try {
                handler.eliminar_producto_factura(params.id,params.idp)
                let product = handler.crear_producto(params.idp, data.nombre, data.marca, data.tipo, data.PVP)
                handler.aniadir_producto_factura(params.id,product,data.cantidad)
                reply.code(200).send({result: `Product with ID ${params.idp} in bill with ID ${params.id} updated successfully.`})
            } catch {
                reply.code(404).send({error: "Product and/or bill not found."})
            }
        }
    })

    fastify.route({
        method: 'GET',
        url: '/:id/total',
        schema: {
            params: CV.BillID
        },
        handler: function (request, reply) {
            let id = JSON.parse(JSON.stringify(request.params)).id
            try {
                let quantity = handler.calcular_total_factura(id)
                reply.code(200).send({total: quantity})
            } catch {
                reply.code(404).send({error: `Bill with ID ${id} not found.`})
            }
        }
    })

    fastify.route({
        method: 'PATCH',
        url: '/:id/product/:idp',
        schema: {
            params: CV.ProductOfABillID,
            body: CV.QuantityOfAProductData
        }, 
        handler: function (request, reply) {
            let params = JSON.parse(JSON.stringify(request.params))
            let data = JSON.parse(JSON.stringify(request.body))
            try {
                handler.actualizar_cantidad_producto_factura(params.id, params.idp, data.cantidad)
                reply.code(200).send({result: `Quantity of product with ID ${params.idp} in bill with ID ${params.id} updated successfully.`})
            } catch {
                reply.code(404).send({error: "Product and/or bill not found"})
            }
        }
    })

}
