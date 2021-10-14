import {Producto} from './producto'

export class Factura {

    private _productos: Array<[producto:Producto, cantidad:number]>
    private _fecha:string;

    constructor (fecha:string) {

        this._fecha = fecha;
        this._productos = new Array<[Producto, number]>();

    }

    public get fecha() {

        return this._fecha;

    }

    añadir_venta(producto:Producto, cantidad:number) {
        
        this._productos.push([producto,cantidad])

    }

}
