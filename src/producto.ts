export class Producto {

    private _id_producto:string;
    private _nombre:string;
    private _pvp:number;


    // constructor, le pasamos los parámetros de prodcuto y creamos la clase existencia asociada al mismo
    constructor(id_producto:string, nombre:string, precio:number) {

        this._id_producto = id_producto;
        this._nombre = nombre;
        this._pvp = precio;

    }

    //metodos get
    public get id_producto (): string {

        return this.id_producto;

    }

    public get nombre (): string {

        return this.nombre;

    }

   public get pvp (): number {

        return this.pvp;

    }

}
