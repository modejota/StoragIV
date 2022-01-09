import { Factura } from "./models/factura";

export function parseFactura(factura: Factura) {
    let jsonObject = {
        "products": {},
        "fecha": "undefined"
    }
    jsonObject.products = JSON.stringify(Object.fromEntries(factura.productos))
    jsonObject.fecha = JSON.stringify(factura.fecha)
    return jsonObject
}

export function parseFacturas(facturas: Map<number, Factura>) {
    let matrix: any [] = [];
    facturas.forEach((value: Factura, key: number) => {
        matrix.push([key,parseFactura(value)])
    })
    return matrix
}