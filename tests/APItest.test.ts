import server from "../src/app";
import { Existencias } from "../src/models/existencias";

let aProduct = { id: 1, nombre: "Nombre test", marca: "Marca test", tipo:2, PVP:13.90, cantidad:7 }
let modifyingProductData = { nombre: "Este es otro nombre", marca: "Otra marca", tipo: 3, PVP: 12.90, cantidad: 9 }
let anID = { id: 1 }

describe('Tests de rutas generales', () => {
    it('Root route', async () => {
        const res = await server.inject({
            url: "/",
            method: "GET"
        });
        expect(res.json()).toEqual({greeting: "Welcome to storagIV API"})
    })

    it('Status route', async () => {
        const res = await server.inject({
            url: "/status",
            method: "GET"
        });
        expect(res.json()).toEqual({hello: "I am live!"})
        expect(res.statusCode).toBe(200)
    })
})

describe('Tests de rutas relativas al almacen', () => {
    
    it('POST a product', async () => {
        const res = await server.inject({
            url: "/products",
            method: 'POST',
            payload: aProduct,
        });
        expect(res.statusCode).toBe(201)
        expect(res.json()).toEqual({result: "Product added successfully to storage."})
    })

    it('POST a product with ID already exiting', async () => { 
        const res = await server.inject({
            url: "/products",
            method: 'POST',
            payload: aProduct,
        });
        expect(res.json()).toEqual({error: `Product with ID 1 already existing. Can't create.`})
    })
    
    it('GET a product', async () => {
        let expected_product = [{"_PVP": aProduct.PVP, "_id_producto": aProduct.id, "_marca": aProduct.marca, 
                                "_nombre": aProduct.nombre, "_tipo": aProduct.tipo}, aProduct.cantidad] 
        const res = await server.inject({
            url: "/products/" + aProduct.id,
            method: "GET",
        });
        expect(res.statusCode).toBe(200)
        expect(res.json().sort()).toEqual(expected_product.sort())
    })

    it('GET a non existing product', async () => {
        const res = await server.inject({
            url: "/products/100",
            method: "GET",
        });
        expect(res.statusCode).toBe(404)
    })

    it('GET all products', async () => {
        let expected_storage = { '1': [  { _id_producto: aProduct.id, _nombre: aProduct.nombre, _marca: aProduct.marca, _PVP: aProduct.PVP, _tipo: aProduct.tipo}, 
                                         aProduct.cantidad 
                                ] 
                        }
        const res = await server.inject({
            url: "/products",
            method: "GET"
        });
        expect(res.statusCode).toBe(200)
        expect(res.json()).toEqual(expected_storage)
    })

    it('PUT a product', async () => {
        const res = await server.inject({
            url: "/products/" + aProduct.id,
            method: "PUT",
            payload: modifyingProductData
        });
        expect(res.statusCode).toBe(200)
        expect(res.json()).toEqual({result: `Product with ID 1 updated successfully.`})
    })

    it('PUT a non existing product', async () => {
        const res = await server.inject({
            url: "/products/100",
            method: "PUT",
            payload: modifyingProductData
        });
        expect(res.statusCode).toBe(404)
    })

    it('PATCH the quantity of a product', async() => {
        const res = await server.inject({
            url: "/products/" + aProduct.id,
            method: "PATCH",
            payload: {cantidad: 99}
        });
        expect(res.statusCode).toBe(200)
        expect(res.json()).toEqual({result: `Quantity of product with ID 1 updated successfully.`})
    })

    it('PATCH the quantity of a non existing product', async() => {
        const res = await server.inject({
            url: "/products/100",
            method: "PATCH",
            payload: {cantidad: 99}
        });
        expect(res.statusCode).toBe(404)
    })

    it('DELETE a product', async () => {
        const res = await server.inject({
            url: "/products/" + aProduct.id,
            method: "DELETE",
        });
        expect(res.statusCode).toBe(200)
        expect(res.json()).toEqual({result: `Product with ID 1 deleted successfully.`})
    })

    it('DELETE a non existing product', async () => {
        const res = await server.inject({
            url: "/products/100",
            method: "DELETE",
        });
        expect(res.statusCode).toBe(404)
    })

})

describe('Tests de rutas relativas a las facturas', () => {
    
    it('POST a bill', async () => {
        const res = await server.inject({
            url: "/bills",
            method: 'POST',
            payload: anID,
        });
        expect(res.statusCode).toBe(201)
        expect(res.json()).toEqual({result: `Bill with ID ${anID.id} created successfully.`})
    })

    it('POST a bill with ID already exiting', async () => { 
        const res = await server.inject({
            url: "/bills",
            method: 'POST',
            payload: anID,
        });
        expect(res.json()).toEqual({error: `Bill with ID ${anID.id} already existing. Can't create.`})
    })    
    
    it('POST a product to a bill', async () => {
        const res = await server.inject({
            url:"/bills/" + anID.id,
            method: "POST",
            payload: aProduct
        });
        expect(res.json()).toEqual({result: `Product added successfully to bill with ID ${anID.id}.`})
    })

    it('POST an existing product to a bill', async () => {
        const res = await server.inject({
            url: "/bills/" + anID.id,
            method: "POST",
            payload: aProduct
        });
        expect(res.json()).toEqual({error: `Product with ID ${aProduct.id} already existing in bill with ID ${anID.id}. Can't create.`})
    })

    it('GET all bills', async() => {
        const res = await server.inject({
            url: "/bills",
            method: "GET"
        });
        expect(res.statusCode).toBe(200)
    })

    
    it('GET a bill', async () => {
        const res = await server.inject({
            url: "/bills/" + anID.id,
            method: "GET",
        });

        let received_date = new Date(JSON.parse(res.json().fecha)).toISOString().split('T')[0]
        let expected_date = new Date().toISOString().split('T')[0]
        let expected_data = {"1":[{"_id_producto":1,"_nombre":"Nombre test","_marca":"Marca test","_PVP":13.9,"_tipo":2},7]}

        expect(res.statusCode).toBe(200)
        expect(received_date).toEqual(expected_date)
        expect(JSON.parse(res.json().products)).toEqual(expected_data)
    })

    it('GET a non existing bill', async () => {
        const res = await server.inject({
            url: "/bills/100",
            method: "GET",
        });

        expect(res.statusCode).toBe(404)
    })
    
    it('GET a product from bill', async () => {
        const res = await server.inject({
            url: "/bills/" + anID.id + "/product/" + anID.id,
            method: "GET",
        });
        expect(res.statusCode).toBe(200)

    })

    it('GET a non existing product from bill', async () => {
        const res = await server.inject({
            url: "/bills/" + anID.id + "/product/100",
            method: "GET",
        });
        expect(res.statusCode).toBe(404)
    })

    it('GET total from a bill', async() => {
        const res = await server.inject({
            url: "/bills/" + anID.id + "/total",
            method: "GET"
        })
        let expected_total = aProduct.PVP * aProduct.cantidad
        expect(res.statusCode).toBe(200)
        expect(res.json()).toEqual({"total": expected_total})
    })

    it('GET total from a non existing bill', async() => {
        const res = await server.inject({
            url: "/bills/100/total",
            method: "GET"
        })
        expect(res.statusCode).toBe(404)
    })

    it('PUT a product in a bill', async() => {
        const res = await server.inject({
            url: "/bills/" + anID.id + "/product/" + anID.id,
            method: "PUT",
            payload: modifyingProductData
        })
        expect(res.statusCode).toBe(200)
        expect(res.json()).toEqual({result: `Product with ID ${anID.id} in bill with ID ${anID.id} updated successfully.`})
    })

    it('PATCH the quantity of a product in a bill', async() => {
        const res = await server.inject({
            url: "/bills/" + anID.id + "/product/" + anID.id,
            method: "PATCH",
            payload: {cantidad: 20}
        })
        expect(res.statusCode).toBe(200)
        expect(res.json()).toEqual({result: `Quantity of product with ID ${anID.id} in bill with ID ${anID.id} updated successfully.`})
    })

    it('PATCH the quantity of a non existing product in a bill', async() => {
        const res = await server.inject({
            url: "/bills/" + anID.id + "/product/100",
            method: "PATCH",
            payload: {cantidad: 20}
        })
        expect(res.statusCode).toBe(404)
    })
    
    it('DELETE a product from a bill', async() => {
        const res = await server.inject({
            url: "/bills/" + anID.id + "/product/" + anID.id,
            method: "DELETE"
        })
        expect(res.statusCode).toBe(200)
        expect(res.json()).toEqual({result: `Product with ID ${anID.id} deleted successfully from bill with ID ${anID.id}.`})
    })

    it('DELETE a non existing product from a bill', async() => {
        const res = await server.inject({
            url: "/bills/" + anID.id + "/product/100",
            method: "DELETE"
        })
        expect(res.statusCode).toBe(404)
    })

    it('DELETE a bill', async() => {
        const res = await server.inject({
            url: "/bills/" + anID.id,
            method: "DELETE"
        })
        expect(res.statusCode).toBe(200)
        expect(res.json()).toEqual({result: `Bill with ID ${anID.id} deleted successfully.`})
    })

    it('DELETE a non existing bill', async() => {
        const res = await server.inject({
            url: "/bills/100",
            method: "DELETE"
        })
        expect(res.statusCode).toBe(404)
    })

})