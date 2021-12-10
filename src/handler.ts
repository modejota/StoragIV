import { Error_existencias, Error_factura, Error_producto, Error_handler } from  "./errores"
import { Existencias } from "./models/existencias";
import { Factura } from "./models/factura";
import { Producto } from "./models/producto";
import { Tipo_producto } from "./models/tipo_producto";
import { logger } from "./logger"

export class Handler {
    private _existencias: Existencias
    private _facturas: Map<number, Factura>

    /**
     * Constructor del objeto manejador
     * Crea un inventario sin productos y un conjunto vacío de facturas
     */
    constructor() {
        this._existencias = new Existencias()
        this._facturas = new Map<number, Factura>()
    }
 
    public crear_producto(id_producto:number, nombre:string, marca:string, tipo:Tipo_producto, PVP:number) {
        try {
            let producto = new Producto(id_producto,nombre,marca,tipo,PVP) 
            logger.info(`Producto con ID ${producto.id_producto} creado con éxito.`)
            return producto
        } catch (exception) {
            logger.error(exception);
            if (exception instanceof Error_producto)
                throw new Error_handler(exception.message)
        }   
    }

    public aniadir_producto_almacen(producto: Producto, cantidad = 0) {
        try {
            this._existencias.aniadir_producto(producto,cantidad)
            logger.info(`Producto con ID ${producto.id_producto} añadido al almacen.`)
        } catch (exception) {
            logger.error(exception)
            if (exception instanceof Error_existencias)
                throw new Error_handler(exception.message)
        }
    }

    public obtener_producto_almacen(ID:number) {
        try {
            let producto = this._existencias.obtener_producto(ID)
            if(producto) {
                logger.info(`Producto con ID ${producto[0].id_producto} y cantidad ${producto[1]} obtenido con éxito.`)
                return producto
            }
        } catch (exception) {
            logger.error(exception)
            if (exception instanceof Error_existencias)
                throw new Error_handler(exception.message)
        }
    }

    public eliminar_producto_almacen(ID:number) {
        try {
            this._existencias.eliminar_producto(ID)
            logger.info(`Producto con ID ${ID} eliminado del almacen.`)
        } catch (exception) {
            logger.error(exception)
            if (exception instanceof Error_existencias)
                throw new Error_handler(exception.message)
        }
    }

    public actualizar_cantidad_producto_almacen(ID: number, cantidad: number) {
        try {
            this._existencias.actualizar_cantidad_producto(ID,cantidad)
            logger.info(`Cantidad del producto con ID ${ID} actualizado correctamente.`)
        } catch (exception) {
            logger.error(exception)
            if (exception instanceof Error_existencias)
                throw new Error_handler(exception.message)
        }
    }

    public get_num_items_almacen() {
        return this._existencias.get_num_items()
    }

    public crear_factura(ID:number, fecha = new Date()) {
        if (this._facturas.has(ID)) {
            logger.error(`Se intentó crar una factura con ID ${ID} ya existente`)
            throw new Error_handler(` Se intentó crar una factura con ID ${ID} ya existente `)
        } 
        else {
            let factura = new Factura(fecha)
            this._facturas.set(ID,factura)
            logger.info(`Factura con ID ${ID} creada y añadida al sistema con éxito.`)
        }
    }

    public aniadir_producto_factura(ID:number,producto:Producto,cantidad=0) {
        if (!this._facturas.has(ID)) {
            logger.error(`Se intentó añadir un producto a una factura con ID ${ID} no existente`)
            throw new Error_handler(` Se intentó añadir un producto a una factura con ID ${ID} no existente `)
        } 
        else {
            try {
                let factura = this._facturas.get(ID)
                if(factura) {
                    factura.aniadir_producto(producto,cantidad)
                    this._facturas.set(ID,factura)
                    logger.info(`Producto con ID ${producto.id_producto} y cantidad ${cantidad} añadido con éxito a la factura con ID ${ID}`)
                }
            } catch (exception) {
                logger.error(exception)
                if (exception instanceof Error_factura)
                    throw new Error_handler(exception.message)
            }
        }
    }

    public obtener_producto_factura(ID_factura:number,ID_producto:number) {
        if (!this._facturas.has(ID_factura)) {
            logger.error(`Se intentó obtener un producto a una factura con ID ${ID_factura} no existente`)
            throw new Error_handler(` Se intentó obtener un producto a una factura con ID ${ID_factura} no existente `)
        } else {
            try {
                let producto = this._facturas.get(ID_factura)?.obtener_producto(ID_producto)
                if (producto) {
                    logger.info(`Obtenido producto con ${producto[0].id_producto} y cantidad ${producto[1]} obtenido con éxito de la factura con ID ${ID_factura}`)
                    return producto
                }
            } catch (exception) {
                logger.error(exception)
                if (exception instanceof Error_factura)
                    throw new Error_handler(exception.message) 
            }
        }
    }

    public eliminar_producto(ID_factura:number,ID_producto:number) {
        if (!this._facturas.has(ID_factura)) {
            logger.error(`Se intentó eliminar un producto de una factura con ID ${ID_factura} no existente`)
            throw new Error_handler(` Se intentó eliminar un producto de una factura con ID ${ID_factura} no existente `)
        } else {
            try {
                this._facturas.get(ID_factura)?.eliminar_producto(ID_producto)
                logger.info(`Eliminado producto con ID ${ID_producto} de la factura ${ID_factura} con éxito`)
            } catch (exception) {
                logger.error(exception)
                if (exception instanceof Error_factura)
                    throw new Error_handler(exception.message) 
            }
        }
    }

    public actualizar_cantidad_producto_factura(ID_factura:number,ID_producto:number,new_c:number) {
        if (!this._facturas.has(ID_factura)) {
            logger.error(`Se intentó eliminar un producto de una factura con ID ${ID_factura} no existente`)
            throw new Error_handler(` Se intentó eliminar un producto de una factura con ID ${ID_factura} no existente `)
        } else {
            try {
                this._facturas.get(ID_factura)?.actualizar_cantidad_producto(ID_producto,new_c)
                logger.info(`Cantidad del producto con ID ${ID_producto} de la factura ${ID_factura} actualizado con éxito`)
            } catch (exception) {
                logger.error(exception)
                if (exception instanceof Error_factura)
                    throw new Error_handler(exception.message) 
            }
        }
    }
    
    public calcular_total_factura(ID_factura:number) {
        if (!this._facturas.has(ID_factura)) {
            logger.error(`Se intentó calcular el total de una factura con ID ${ID_factura} no existente`)
            throw new Error_handler(` Se intentó calcular el total de una factura con ID ${ID_factura} no existente `)
        } else {
            let total = this._facturas.get(ID_factura)?.calcular_total()
            logger.info(`Calculado total de la factura con ID ${ID_factura} con éxito`)
            return total
        }
    }

    public get_num_items_factura(ID_factura:number) {
        if (!this._facturas.has(ID_factura)) {
            logger.error(`Se intentó obtener el numero de productos de una factura con ID ${ID_factura} no existente`)
            throw new Error_handler(` Se intentó obtener el numero de productos de una factura con ID ${ID_factura} no existente `)
        } else {
            let num_items = this._facturas.get(ID_factura)?.get_num_items()
            logger.info(`Obtenido el número de productos de la factura con ID ${ID_factura} con éxito`)
            return num_items
        }
    }

}

