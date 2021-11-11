import { Producto } from "./producto";
import { Constantes } from "./constantes";
import { Error_factura } from "./errores";

/**
 * Representa una factura del negocio
 * @public
 */
export class Factura {
    private _productos: Map<number,[_producto: Producto, cantidad: number]>;
    private _fecha: Date;
    
    /**
     * Constructor del objeto ventas
     * Crea una venta sin productos
     */
    constructor(fecha: Date) {
        this._productos = new Map<number, [Producto, number]>()
        this._fecha = fecha;
    }

    /**
     * Método para añadir un nuevo producto a la venta
     * @param producto Producto que se ha vendido
     * @param cantidad Cantidad del producto que se ha vendido
     */
    public aniadir_producto(producto: Producto, cantidad = 0) {
        let key = producto.id_producto

        if (cantidad < Constantes.CANTIDAD_INVALIDA) 
            throw new Error_factura(` Se intentó vender un producto con ID ${key} y cantidad ${cantidad} no válida `)

        if (this._productos.has(key))
            throw new Error_factura(` Se intentó vender un producto con ID ${key} ya existente `)
        else
            this._productos.set(key,[producto,cantidad])
    }

    /**
     * Método para obtener los datos de un producto y su cantidad a partir de su ID único
     * @param ID Identificador único del producto a obtener
     * @returns Tupla con el producto y cantidad del mismo
     */
    public obtener_producto(ID: number) {
        if (ID <= Constantes.ID_INVALIDO)
            throw new Error_factura(` Se intentó obtener un producto con ID ${ID} inválido `)
        
        if (this._productos.has(ID))
            return this._productos.get(ID)
        else
            throw new Error_factura(` Se intentó obtener un producto con ID ${ID} no presente en la factura `)
    }
    
    /**
     * Método para eliminar un producto de la factura a partir de su identificador único
     * @param ID Identificador único del producto a eliminar
     */
    public eliminar_producto(ID: number) {
        if (ID <= Constantes.ID_INVALIDO)
            throw new Error_factura(` Se intentó eliminar un producto con ID ${ID} inválido `)
    
        if (this._productos.has(ID))
            this._productos.delete(ID)
        else
            throw new Error_factura(` Se intentó eliminar un producto con ID ${ID} no presente en la factura `)
    }

    /**
     * Método para actualizar la cantidad de un producto en una factura
     * @param ID Identificador único del producto
     * @new_c Nueva cantidad del producto con identificador ID
     */
    public actualizar_cantidad_producto(ID: number, new_c: number) {
        if (ID <= Constantes.ID_INVALIDO)
            throw new Error_factura(` Se intentó acceder un producto con ID ${ID} inválido `)
        
        if (new_c <= Constantes.CANTIDAD_INVALIDA)
            throw new Error_factura(` Se  intentó asignar la cantidad ${new_c} inválida al producto con ID ${ID} `)

        if (this._productos.has(ID)) {
            let producto = this._productos.get(ID)?.[0]
            if(producto)    // Comprobar no es "Undefined"
                this._productos.set(ID,[producto,new_c])
        } else {
            throw new Error_factura( `Se intentó acceder a un producto con ID ${ID} no presente en la factura `)
        }
    }

    /**
     * Método para calcular el total de una factura
     * @returns Total de la factura
     */
    public calcular_total() {
        let total: number = 0 
        this._productos.forEach((value: [_producto: Producto, cantidad: number], key: number, ) => {
            total += (value[0].PVP * value[1])
        })
        return total
    }

}
