import { Constantes } from "./constantes"
import { Error_producto } from "./errores"
import { Tipo_producto } from "./tipo_producto";

/**
 * Representa un producto del inventario
 * @public
 */
export class Producto {
    
    private _id_producto:number;
    private _PVP:number;
    private _nombre:string;
    private _marca:string;
    private _tipo:Tipo_producto;

    /**
     * Constructor del objeto producto
     * 
     * @param id_producto ID único asignado a cada producto
     * @param PVP Precio de venta del producto
     * @param nombre Nombre del producto
     * @param marca Marca y/o fabricante del producto
     * @param tipo Tipo de producto en el que se enmarca
     */
    constructor(id_producto:number, PVP:number, nombre:string, marca:string, tipo:Tipo_producto) {

        if(id_producto <= Constantes.ID_INVALIDO) {
            throw new Error_producto("Se intenta crear el producto con un ID no válido");
        }
        this._id_producto = id_producto;


        if (!nombre) {
            throw new Error_producto(` Se intentó crear un producto con ID ${id_producto} sin nombre `);

        } else if (nombre.length < Constantes.LON_NOMBRE_MIN) {
            throw new Error_producto(` Se intentó crear un producto con ID ${id_producto} con un nombre demasido corto `);

        } else if (nombre.length > Constantes.LON_NOMBRE_MAX) {
            throw new Error_producto(` Se intentó crear un producto con ID ${id_producto} con un nombre demasido largo `);

        }
        this._nombre = nombre;

        if(!marca) {
            throw new Error_producto(` Se intentó crear un producto con ID ${id_producto} y nombre ${nombre} sin marca `);

        } else if (marca.length < Constantes.LON_MARCA_MIN) {
            throw new Error_producto(` Se intentó crear un producto con ID ${id_producto} y nombre ${nombre} con una marca muy corta `);

        } else if (marca.length > Constantes.LON_MARCA_MAX) {
            throw new Error_producto(` Se intentó crear un producto con ID "${id_producto} y nombre ${nombre} con una marca muy larga`);

        }
        this._marca = marca;

        if(PVP <= Constantes.CANTIDAD_INVALIDA) {
            throw new Error_producto(` Se intentó crear un producto con ID ${id_producto}, nombre ${nombre}, marca ${marca} y PVP inválido `);
        
        }
        this._PVP = PVP;

        this._tipo = tipo;
    }

    /**
     * Devuelve el identificador único del producto
     * @returns ID único del producto
     */
    public get id_producto() { 
        return this._id_producto;
    }

    /**
     * Devuelve el nombre del producto
     * @returns Nombre del producto
     */
    public get nombre() { 
        return this._nombre;   
    }

    /**
     * Devuelve la marca y/o fabricante del producto
     * @returns Marca/fabricante del producto
     */
    public get marca() { 
        return this._marca;
    }

    /**
     * Devuelve el tipo de producto
     * @returns Tipo de producto
     */
    public get tipo() { 
        return this._tipo;
    }

    /**
     * Devuelve el precio de venta del producto
     * @returns PVP del producto
     */
    public get PVP() {
        return this._PVP;
    }

}
