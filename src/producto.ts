import { Constantes } from "./constantes"
import { Error_producto } from "./errores"
import { Tipo_producto } from "./tipo_producto";

export class Producto {
    
    private _id_producto:number;
    private _nombre:string;
    private _marca:string;
    private _tipo:Tipo_producto;

    constructor(id_producto:number, nombre:string, marca:string, tipo:Tipo_producto) {

        if(id_producto <= Constantes.ID_INVALIDO) {

            throw new Error_producto("Se intenta crear el producto con un ID no válido");

        }
        this._id_producto = id_producto;

        if (!nombre) {

            throw new Error_producto("Se intentó crear un producto con ID = " + id_producto + " sin nombre");

        } else if (nombre.length < Constantes.LON_NOMBRE_MIN) {

            throw new Error_producto("Se intentó crear un producto con ID " + id_producto + " con un nombre demasido corto");

        } else if (nombre.length > Constantes.LON_NOMBRE_MAX) {

            throw new Error_producto("Se intentó crear un producto con ID " + id_producto + " con un nombre demasido largo");

        }
        this._nombre = nombre;

        if(!marca) {

            throw new Error_producto("Se intentó crear un producto con ID " + id_producto + " y nombre \'" + nombre + "\' sin marca");

        } else if (marca.length < Constantes.LON_MARCA_MIN) {

            throw new Error_producto("Se intentó crear un producto con ID " + id_producto + " y nombre \'" + nombre + "\' con una marca muy corta");

        } else if (marca.length > Constantes.LON_MARCA_MAX) {

            throw new Error_producto("Se intentó crear un producto con ID " + id_producto + " y nombre \'" + nombre + "\' con una marca muy larga");

        }
        this._marca = marca;

        this._tipo = tipo;
    }

    //accesores
    public get id_prodcuto() { 

        return this._id_producto;

    }

    public get nombre() { 

        return this._nombre;   

    }

    public get marca() { 
        
        return this._marca;

    }

    public get tipo() { 

        return this._tipo;

    }

}
