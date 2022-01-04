import { Constantes as C } from "./constantes"

/**
 * Clase pare representar los valores constantes, usados para validaciones en las funciones de los controladores de la API
 * @public
 */

export abstract class ConstantesValidacion {

    /**
     * Comprobar que recibimos obligatoriamente un ID de producto válido
     */
    static readonly ProductID = {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'number', minimum: C.ID_INVALIDO+1 }
        }
    }

    /**
     * Comprobar que recibimos obligatoriamente un ID de factura válido
     */
    static readonly BillID = {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'number', minimum: C.ID_INVALIDO+1 }
        }
    }

    /**
     * Comprobar que recibimos obligatoriamente tanto un ID de factura como de producto válido
     */
    static readonly ProductOfABillID = {
        type: 'object',
        required: ['id', 'idp'],
        properties: {
            id: { type: 'number', minimum: C.ID_INVALIDO+1 },
            idp: { type: 'number', minimum: C.ID_INVALIDO+1 }
        }
    }

    /**
     * Comprobar que recibimos los campos necesarios para crear un producto y opcionalmente, la cantidad.
     */
    static readonly ProductData = {
        type: 'object',
        required: ['id','nombre','marca','tipo','PVP'],
        properties: {
            id: { type: 'number', minimum: C.ID_INVALIDO+1 },
            nombre: { type: 'string', minLength: C.LON_NOMBRE_MIN, maxLength: C.LON_NOMBRE_MAX },
            marca: { type: 'string', minLength: C.LON_MARCA_MIN, maxLength: C.LON_NOMBRE_MAX },
            tipo: { type: 'number', minimum: C.ID_INVALIDO },
            PVP: { type: 'number', minimum: C.ID_INVALIDO },
            cantidad: { type: 'number', minimum: C.ID_INVALIDO }
        }
    }

    /**
     * Comprobar que recibimos los campos necesarios para modificar un producto, ya sea en el almacen o en una factura
     */
    static readonly ModifyingProductData = {
        type: 'object',
        required: ['nombre', 'marca', 'tipo', 'PVP', 'cantidad'],
        properties: {
            nombre: { type: 'string', minLength: C.LON_NOMBRE_MIN, maxLength: C.LON_NOMBRE_MAX },
            marca: { type: 'string', minLength: C.LON_MARCA_MIN, maxLength: C.LON_NOMBRE_MAX },
            tipo: { type: 'number', minimum: C.ID_INVALIDO },
            PVP: {type: 'number', minimum: C.ID_INVALIDO },
            cantidad: {type: 'number', minimum: C.ID_INVALIDO }
        }
    }

    /**
     * Comprobar que recibimos obligatoriamente una cantidad de un porducto
     */
    static readonly QuantityOfAProductData = {
        type: 'object',
        required: ['cantidad'],
        properties: {
            cantidad: { type: 'number', minimum: C.ID_INVALIDO+1 }
        }
    }

}