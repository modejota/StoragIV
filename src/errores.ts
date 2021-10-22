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