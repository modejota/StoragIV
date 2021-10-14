import {Producto} from './producto'

export class Existencias {

    private almacen_:Map<string, [producto_:Producto, cantidad_:number]>; //hash con clave del producto en el sistema (string) y tupla producto y cantidad

    constructor () {

        this.almacen_ = new Map<string, [Producto, number]>();

    }

    //método para añadir al vector
    añadir_producto (id_producto:string, producto:Producto, cantidad:number) {

        if (this.almacen_.has(id_producto)) {

            return false;

        }
        else {

            this.almacen_.set(id_producto, [producto, cantidad]);
            return true;

        }


    }

    get_producto (id_producto:string) {

        if (this.almacen_.has(id_producto)) {

            return this.almacen_.get(id_producto);

        }
        else {

            return null;

        }

    }

}
