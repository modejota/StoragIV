import { Producto } from "./producto";

/**
 * Representa el inventario del negocio
 * @public
 */
export class Existencias {
    private _inventario: Map<number,[Producto, number]>

    /**
     * Constructor del objeto existencias
     * Crea un inventario sin objetos
     */
    constructor() {
        this._inventario = new Map<number, [Producto, number]>()
    }
}