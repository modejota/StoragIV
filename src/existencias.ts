import {Producto} from './producto'

export class Existencias {

    private almacen_:[producto:Producto, cantidad:number][]; //vector de tuplas que almacena el producto y la cantidad existente en la misma tupla

    constructor () {

        this.almacen_ = new Array();

    }

    //método para añadir al vector
    añadir_producto (existencia_:Producto, cantidad:number) {

        this.almacen_.push([existencia_, cantidad]);

    }

    //método para buscar, devuelve el índice
    busco_producto (id:string): number {

        let seguir:boolean = true;
        let indice = -1;

        for (let i = 0; this.almacen_.length && seguir; i++) {

            indice = i;
            let id_producto = this.almacen_[indice][0].id_producto;

            if (id_producto == id) {

                seguir = false;

            }

        }

        return indice;

    }

    //método para devolver la cantidad
    cantidad_producto (id:string): number {

        let cantidad_devolver = 0;
        let producto = this.busco_producto(id); //lo busco para ver si existe en el sistema

        if (producto != -1) { //si existe, devolvemos su cantidad, si no pues será 0

            cantidad_devolver = this.almacen_[producto][1]; //devuelvo el valor 1 de la tupla (cantidad)

        }

        return cantidad_devolver;

    }

    //método para modificar la cantidad
    nueva_cantidad (id:string, cantidad:number) {

        let producto = this.busco_producto(id);

        if (producto != -1) {

            this.almacen_[producto][1] = cantidad;
            return "Valor actualizado correctamente";

        }

        else {

            return "Valor no actualizado"

        }

    } 

}
