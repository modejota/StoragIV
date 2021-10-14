import {Factura} from './factura'
import {Existencias} from './existencias'
import { Producto } from './producto';

class gestor  {

    private _ventas:Map<string, Factura>;
    private _existencias:Existencias;


    constructor (existencias:Existencias) {

        this._existencias = new Existencias();
        this._ventas = new Map<string, Factura>();   

    }

    añadir_venta(id_factura:string, venta:Factura) {

        if (this._ventas.has(id_factura)) {

            return false;

        }
        else {

            this._ventas.set(id_factura, venta);
            return true;

        }

    }
    
    añadir_producto(id_producto:string, producto:Producto, cantidad: number) {

        if (this._existencias.get_producto(id_producto) != null) {

            this._existencias.añadir_producto(id_producto, producto,cantidad);
            return true;

        }
        else {

            return false;

        }
    }


}
