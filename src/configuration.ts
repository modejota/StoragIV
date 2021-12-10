import { Etcd3 } from "etcd3"
require('dotenv').config({
    path: '../config/configuration.env'
})
const client = new Etcd3();
/**
 * Representa los valores para la configuración de la aplicación
 * @public
 */
export class Configuration {
    private _log_directory: any;
    private _log_file: any;
    
    /**
     * Constructor del objeto de configuración
     */
    constructor() {

        (async () => {
            this._log_directory = await client.get('LOG_DIR').string().catch(err => {})
        })()
        if(this._log_directory == null && process.env.LOG_DIR != undefined) {
            this._log_directory = process.env.LOG_DIR
        } else {
            this._log_directory = "/var/log/storagiv/"
        }

        (async () => {
            this._log_file = await client.get('LOG_FILE').string().catch(err => {})
        })()
        if(this._log_file == null && process.env.LOG_FILE != undefined) {
            this._log_file = process.env.LOG_FILE
        } else {
            this._log_file = "logs.json"
        }

    }

    /**
     * Método para obtener el directorio donde se almacenan los logs
     * @returns Ruta del directorio donde se almacenan los logs
     */
    public get log_directory(): string {
        return this._log_directory
    }

    /**
     * Método para obtener el nombre del archivo donde se almacenan los logs
     * @returns Nombre del archivo donde se almacenan los logs
     */
    public get log_file(): string { 
        return this._log_file
    }

    /**
     * Método para obtener la ruta completa del fichero donde se almacenan los log
     * @returns Ruta completa del fichero donde se almacenan los logs
     */
    public get log_file_path(): string {
        return this.log_directory + this.log_file
    }

}