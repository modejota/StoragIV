import { Error_existencias, Error_factura, Error_producto, Error_handler } from  "./errores";
import { Existencias } from "./models/existencias";
import { Factura } from "./models/factura";
import { Producto } from "./models/producto";
import { Tipo_producto } from "./models/tipo_producto";
import { logger } from "./logger";
import { Constantes } from "./constantes";

class Handler {
    private _existencias: Existencias
    private _facturas: Map<number, Factura>
    private _last_err_message: string

    /**
     * Constructor del objeto manejador
     * Crea un inventario sin productos y un conjunto vacío de facturas
     */
    constructor() {
        this._existencias = new Existencias()
        this._facturas = new Map<number, Factura>()
        this._last_err_message = ""
    }
 
    /**
     * Método para crear un objeto del tipo Producto
     * 
     * @param id_producto ID único asignado a cada producto
     * @param nombre Nombre del producto
     * @param marca Marca y/o fabricante del producto
     * @param tipo Tipo de producto en el que se enmarca
     * @param PVP Precio de venta del producto
     * @returns Objeto del tipo producto debidamente inicializado
     */
    public crear_producto(id_producto:number, nombre:string, marca:string, tipo:Tipo_producto, PVP:number): Producto {
        try {
            let producto = new Producto(id_producto,nombre,marca,tipo,PVP) 
            logger.info(`Producto con ID ${producto.id_producto} creado con éxito.`)
            return producto
        } catch (exception) {
            logger.error(exception);
            if (exception instanceof Error_producto)
                this._last_err_message = exception.message
            throw new Error_handler(this._last_err_message)
        }  
    }

    /**
     * Método para añadir un nuevo producto al almacén
     * @param producto Producto a insertar en el almacén
     * @param cantidad Cantidad del producto que se desea insertar
     */
    public aniadir_producto_almacen(producto: Producto, cantidad = 0) {
        try {
            this._existencias.aniadir_producto(producto,cantidad)
            logger.info(`Producto con ID ${producto.id_producto} añadido al almacen.`)
        } catch (exception) {
            logger.error(exception)
            if (exception instanceof Error_existencias)
                this._last_err_message = exception.message
            throw new Error_handler(this._last_err_message)
        }
    }

    /**
     * Método para obtener los datos de un producto y su cantidad a partir de su ID único
     * @param ID Identificador único del producto a obtener
     * @returns Tupla con el producto y cantidad del mismo
     */
    public obtener_producto_almacen(ID:number): [Producto,number] {
        try {
            let producto = this._existencias.obtener_producto(ID) as [Producto,number]
            logger.info(`Producto con ID ${ID} obtenido con éxito.`)
            return producto
        } catch (exception) {
            logger.error(exception)
            if (exception instanceof Error_existencias)
                this._last_err_message = exception.message
            throw new Error_handler(this._last_err_message)
        }
    }

    /**
     * Método para eliminar un producto del almacén a partir de su identificador único
     * @param ID Identificador único del producto a eliminar
     */
    public eliminar_producto_almacen(ID:number) {
        try {
            this._existencias.eliminar_producto(ID)
            logger.info(`Producto con ID ${ID} eliminado del almacen.`)
        } catch (exception) {
            logger.error(exception)
            if (exception instanceof Error_existencias)
                this._last_err_message = exception.message
            throw new Error_handler(this._last_err_message)
        }
    }

    /**
     * Método para actualizar la cantidad de la que se dispone de un determinado producto en el almacén
     * @param ID Identificador único del producto
     * @param cantidad Valor en el que debe variarse la cantidad del producto
     */
    public actualizar_cantidad_producto_almacen(ID: number, cantidad: number) {
        try {
            this._existencias.actualizar_cantidad_producto(ID,cantidad)
            logger.info(`Cantidad del producto con ID ${ID} actualizado correctamente.`)
        } catch (exception) {
            logger.error(exception)
            if (exception instanceof Error_existencias)
                this._last_err_message = exception.message
            throw new Error_handler(this._last_err_message)
        }
    }

    /**
     * Método para saber el número de productos distintos en el almacén
     * @returns Cantidad de productos distintos en el almacén
     */
    public get_num_items_almacen(): number {
        return this._existencias.get_num_items()
    }

    /**
     * Método para crear una factura sin productos vendidos y añadirla al sistema
     * @param ID_factura ID único de la factura a crear
     * @param fecha Fecha en la que se crea la factura
     */
    public crear_factura(ID_factura:number, fecha = new Date()) {
        if (ID_factura <= Constantes.ID_INVALIDO) {
            this._last_err_message = `Se intentó crear una factura con ID ${ID_factura} inválido.`
            throw new Error_handler(this._last_err_message)
        } else if (this._facturas.has(ID_factura)) {
            this._last_err_message = `Se intentó crear una factura con ID ${ID_factura} ya existente`
            logger.error(this._last_err_message)
            throw new Error_handler(this._last_err_message)
        } else {
            let factura = new Factura(fecha)
            this._facturas.set(ID_factura,factura)
            logger.info(`Factura con ID ${ID_factura} creada y añadida al sistema con éxito.`)
        }
    }

    /**
     * Método para obtener una factura a partir de su identificador único
     * @param ID_factura ID único de la factura a obtener
     * @returns Objeto factura con el identificador único solicitado
     */
    public obtener_factura(ID_factura:number): Factura {
        if (ID_factura <= Constantes.ID_INVALIDO) {
            this._last_err_message = `Se intentó obtener una factura con ID ${ID_factura} inválido.`
            throw new Error_handler(this._last_err_message)
        } else if (!this._facturas.has(ID_factura)) {
            this._last_err_message = `Se intentó obtener una factura con ID ${ID_factura} no existente`
            logger.error(this._last_err_message)
            throw new Error_handler(this._last_err_message)
        } else {
            logger.info(`Factura con ID ${ID_factura} recuperada con éxito.`)
            return this._facturas.get(ID_factura) as Factura
        }
    }

    /**
     * Método para eliminar una factura a partir de su identificador único
     * @param ID_factura ID único de la factura a eliminar
     */
    public eliminar_factura(ID_factura:number) {
        if (!this._facturas.has(ID_factura)) {
            this._last_err_message = `Se intentó eliminar una factura con ID ${ID_factura} no existente`
            logger.error(this._last_err_message)
            throw new Error_handler(this._last_err_message)
        } 
        else {
            this._facturas.delete(ID_factura)
        }
    }

    /**
     * Método para añadir un nuevo producto vendido a una factura
     * @param ID Identificador único de la factura
     * @param producto Producto que se ha vendido
     * @param cantidad Cantidad del producto que se ha vendido
     */
    public aniadir_producto_factura(ID:number,producto:Producto,cantidad=0) {
        if (!this._facturas.has(ID)) {
            this._last_err_message = `Se intentó añadir un producto a una factura con ID ${ID} no existente`
            logger.error(this._last_err_message)
            throw new Error_handler(this._last_err_message)
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
                    this._last_err_message = exception.message
                throw new Error_handler(this._last_err_message)
            }
        }
    }

    /**
     * Método para añadir obtener los datos de un producto presente factura
     * @param ID Identificador único de la factura
     * @param ID_producto Identificador único del producto a obtener
     * @returns Pareja con el producto solicitado y la cantidad vendida
     */
    public obtener_producto_factura(ID_factura:number,ID_producto:number): [Producto,number] {
        if (!this._facturas.has(ID_factura)) {
            this._last_err_message = `Se intentó obtener un producto a una factura con ID ${ID_factura} no existente`
            logger.error(this._last_err_message)
            throw new Error_handler(this._last_err_message)
        } else {
            try {
                let producto = this._facturas.get(ID_factura)?.obtener_producto(ID_producto) as [Producto,number]
                logger.info(`Obtenido producto con ${ID_producto} con éxito de la factura con ID ${ID_factura}`)
                return producto
                
            } catch (exception) {
                logger.error(exception)
                if (exception instanceof Error_factura)
                    this._last_err_message = exception.message
                throw new Error_handler(this._last_err_message) 
            }
        }
    }

    /**
     * Método para eliminar un producto de una factura a partir de sus identificadores únicos
     * @param ID_factura Identificador único de la factura
     * @param ID_producto Identificador único del producto a eliminar
     */
    public eliminar_producto_factura(ID_factura:number,ID_producto:number) {
        if (!this._facturas.has(ID_factura)) {
            this._last_err_message = `Se intentó eliminar un producto de una factura con ID ${ID_factura} no existente`
            logger.error(this._last_err_message)
            throw new Error_handler(this._last_err_message)
        } else {
            try {
                this._facturas.get(ID_factura)?.eliminar_producto(ID_producto)
                logger.info(`Eliminado producto con ID ${ID_producto} de la factura ${ID_factura} con éxito`)
            } catch (exception) {
                logger.error(exception)
                if (exception instanceof Error_factura)
                    this._last_err_message = exception.message
                throw new Error_handler(this._last_err_message) 
            }
        }
    }

    /**
     * Método para actualizar la cantidad de un producto en una factura
     * @param ID_factura Identificador único de la factura
     * @param ID_producto Identificador único del producto
     * @param new_c Nueva cantidad del producto con identificador ID
     */
    public actualizar_cantidad_producto_factura(ID_factura:number,ID_producto:number,new_c:number) {
        if (!this._facturas.has(ID_factura)) {
            this._last_err_message = `Se intentó eliminar un producto de una factura con ID ${ID_factura} no existente`
            logger.error(this._last_err_message)
            throw new Error_handler(this._last_err_message)
        } else {
            try {
                this._facturas.get(ID_factura)?.actualizar_cantidad_producto(ID_producto,new_c)
                logger.info(`Cantidad del producto con ID ${ID_producto} de la factura ${ID_factura} actualizado con éxito`)
            } catch (exception) {
                logger.error(exception)
                if (exception instanceof Error_factura)
                    this._last_err_message = exception.message
                throw new Error_handler(this._last_err_message) 
            }
        }
    }
    
    /**
     * Método para calcular el importe total de una factura
     * @param ID_factura Identificador único de la factura
     * @returns Importe total de la factura
     */
    public calcular_total_factura(ID_factura:number): number {
        if (!this._facturas.has(ID_factura)) {
            this._last_err_message = `Se intentó calcular el total de una factura con ID ${ID_factura} no existente`
            logger.error(this._last_err_message)
            throw new Error_handler(this._last_err_message)
        } else {
            let total = this._facturas.get(ID_factura)?.calcular_total() as number
            logger.info(`Calculado total de la factura con ID ${ID_factura} con éxito`)
            return total
        }
    }

    /**
     * Método para calcular el numero de productos distintos presentes en una factura
     * @param ID_factura Identificador único de la factura
     * @returns Numero de productos distintos
     */
    public get_num_items_factura(ID_factura:number): number {
        if (!this._facturas.has(ID_factura)) {
            this._last_err_message = `Se intentó obtener el numero de productos de una factura con ID ${ID_factura} no existente`
            logger.error(this._last_err_message)
            throw new Error_handler(this._last_err_message)
        } else {
            let num_items = this._facturas.get(ID_factura)?.get_num_items() as number
            logger.info(`Obtenido el número de productos de la factura con ID ${ID_factura} con éxito`)
            return num_items
        }
    }

    /**
     * Método para calcular el numero de facturas almacenadas en el sistema
     * @returns Numero de facturas distintas
     */
    public get_num_facturas(): number {
        return this._facturas.size
    }

    /**
     * Método para obtener todas las facturas disponibles en el sistema
     * @returns Facturas (y correspondientes IDs) presentes en el sistema
     */
    public get_all_facturas(): Map<number, Factura> {
        return this._facturas
    }

    /**
     * Método para obtener todos los productos del almacen
     * @returns Productos presentes en el almacen
     */
    public get_all_productos_almacen(): Existencias {
        return this._existencias
    }


}

export const handler = new Handler()
