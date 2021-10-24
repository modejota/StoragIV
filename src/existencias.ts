import { Constantes } from "./constantes";
import { Error_existencias } from "./errores";
import { Producto } from "./producto";

/**
 * Representa el inventario del negocio a través de una tabla hash.
 * La clave será el ID del producto (codigo de barras), mientras que el valor será una pareja del producto y cantidad almacenada.
 * @public
 */
export class Existencias {
    private _inventario: Map<number,[_producto: Producto, cantidad: number]>

    /**
     * Constructor del objeto existencias
     * Crea un inventario sin productos
     */
    constructor() {
        this._inventario = new Map<number, [Producto, number]>()
    }

    /**
     * Método para añadir un nuevo producto al almacén
     * @param producto Producto a insertar en el almacén
     * @param cantidad Cantidad del producto que se desea insertar
     */
    public aniadir_producto(producto: Producto, cantidad = 0) {
        let key = producto.id_producto

        if (cantidad < Constantes.CANTIDAD_INVALIDA) 
            throw new Error_existencias(` Se intentó añadir un producto con ID ${key} y cantidad ${cantidad} no válida `)

        if (this._inventario.has(key))
            throw new Error_existencias(` Se intentó añadir un producto con ID ${key} ya existente `)
        else
            this._inventario.set(key,[producto,cantidad])
    }

    /**
     * Método para obtener los datos de un producto y su cantidad a partir de su ID único
     * @param ID Identificador único del producto a obtener
     * @returns Tupla con el producto y cantidad del mismo
     */
    public obtener_producto(ID: number) {
        if(ID <= Constantes.ID_INVALIDO)
            throw new Error_existencias(` Se intentó obtener un producto con ID ${ID} inválido `)
        
        if (this._inventario.has(ID))
            return this._inventario.get(ID)
        else
            throw new Error_existencias(` Se intentó obtener un producto con ID ${ID} no existente `)
    }

    /**
     * Método para eliminar un producto del almacén a partir de su identificador único
     * @param ID Identificador único del producto a eliminar
     */
    public eliminar_producto(ID: number) {
        if (ID <= Constantes.ID_INVALIDO)
            throw new Error_existencias(` Se intentó eliminar un producto con ID ${ID} inválido `)
    
        if (this._inventario.has(ID))
            this._inventario.delete(ID)
        else
            throw new Error_existencias(` Se intentó eliminar un producto con ID ${ID} no existente `)
    }

}
