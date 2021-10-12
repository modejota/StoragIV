import {Producto} from './producto'


export class Venta {

    private _producto:Producto;
    private _cantidad:number;
    private _fecha:string;

    constructor (producto:Producto, cantidad:number, fecha:string) {

        this._producto = producto;
        this._cantidad = cantidad;
        this._fecha = fecha;
        //la cantidad será modificada en el gestor, ya que al objeto venta no le corresponde saber que ocurre en el objeto existencias

    }

    //métodos get
    public get producto() {

        return this._producto;

    }

    public get cantidad() {

        return this._cantidad;

    }

    public get todos_datos() {

        return "Se vendieron " + this._cantidad +  "de " + this._producto.nombre + "el" + this._fecha;

    }

}
