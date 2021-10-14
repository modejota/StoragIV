export class Producto {

    private _nombre:string;
    private _pvp:number;


    // constructor, le pasamos los parámetros de prodcuto y creamos la clase existencia asociada al mismo
    constructor(nombre:string, precio:number) {

        this._nombre = nombre;
        this._pvp = precio;

    }

    //metodos get
    public get nombre (): string {

        return this.nombre;

    }

   public get pvp (): number {

        return this.pvp;

    }

}
