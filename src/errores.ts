/**
 * Clase para gestionar los posibles errores que puedan producerse al construir productos
 * @public
 */
export class Error_producto extends Error {
    /**
     * Constructor del objeto de error
     * @param msg Mensaje explicativo con el motivo del error
     */
    constructor(msg: string) {
        super(msg)
    }
}

/**
 * Clase para gestionar los posibles errores que puedan producerse al gestionar las existencias
 * @public
 */
export class Error_existencias extends Error {
    /**
     * Constructor del objeto de error
     * @param msg Mensaje explicativo con el motivo del error
     */
    constructor(msg: string) {
        super(msg)
    }
}

/**
 * Clase para gestionar los posibles errores que puedan producirse al gestionar las facturas
 */
export class Error_factura extends Error {
    /**
     * Constructor del objeto de error
     * @param msg Mensaje explicativo con el motivo del error
     */
    constructor(msg: string) {
        super(msg)
    }
}