import { Producto } from "./producto";

/**
 * Representa el inventario del negocio a través de una tabla hash.
 * La clave será el ID del producto (codigo de barras), mientras que el valor será una pareja del producto y cantidad almacenada.
 * @public
 */
export class Existencias {
    private _inventario: Map<number,[Producto, number]>

    /**
     * Constructor del objeto existencias
     * Crea un inventario sin productos
     */
    constructor() {
        this._inventario = new Map<number, [Producto, number]>()
    }
}