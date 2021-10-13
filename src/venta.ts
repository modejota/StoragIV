import {Producto} from './producto'

//Como estaba antes, solo podia tener un producto y una cantidad
//Tiene mas sentido que pueda añadir tantos productos como quiera, como si fuese una factura
//La fecha si que es común a toda la factura

export class Venta {

    private _productos: [producto:Producto, cantidad:number][]
    private _fecha:string;

    constructor (fecha:string) {
        this._fecha = fecha;
        //La cantidad será modificada en el gestor, ya que al objeto venta no le corresponde saber que ocurre en el objeto existencias
    }

    public get fecha() {

        return this._fecha;

    }

    add_venta(producto:Producto, cantidad:number) {
        
        this._productos.push([producto,cantidad])

    }

    get_producto(id:string) {

        let seguir:boolean = true;
        let indice = -1;

        for (let i = 0; this._productos.length && seguir; i++) {

            indice = i;
            let id_producto = this._productos[indice][0].id_producto;

            if (id_producto == id) {

                seguir = false;

            }

        }

        return this._productos[indice][0];
    }

    get_id_producto(id:string) {

        let seguir:boolean = true;
        let indice = -1;

        for (let i = 0; this._productos.length && seguir; i++) {

            indice = i;
            let id_producto = this._productos[indice][0].id_producto;

            if (id_producto == id) {

                seguir = false;

            }

        }

        return this._productos[indice][0].id_producto;
    }

}
