import {Venta} from './venta'
import {Existencias} from './existencias'
import { Producto } from './producto';

class gestor  {

    private _ventas:Venta[];
    private _existencias:Existencias;


    constructor (existencias:Existencias, ventas:Venta[]) {

        this._existencias = existencias;
        this._ventas = ventas;   

    }

    add_venta(venta:Venta) {
        this._ventas.push(venta)
    }
    
    add_producto(producto:Producto, cantidad: number) {
        this._existencias.añadir_producto(producto,cantidad)
    }


}
