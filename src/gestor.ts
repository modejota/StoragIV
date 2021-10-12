import {Venta} from './venta'
import {Existencias} from './existencias'

export class Gestor  {

    private _ventas:Venta[];
    private _existencias:Existencias;

    constructor (existencias:Existencias) {

        this._existencias = existencias;   

    }

    //procesar la venta
    venta(venta:Venta) {

        this._ventas.push(venta);
        let producto = this._ventas[this._ventas.length -1].producto.id_producto;
        let cantidad_inicial = this._existencias.cantidad_producto(producto);
        let cantidad_venta = this._ventas[this._ventas.length -1].cantidad;
        let cantidad = cantidad_inicial - cantidad_venta;
        this._existencias.nueva_cantidad(producto, cantidad);

    }

}
