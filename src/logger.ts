import { Configuration } from './configuration';
import * as fs from 'fs';

const configuration = new Configuration()
const log_directory = configuration.log_directory
const log_file_path = configuration.log_file_path

if(!fs.existsSync(log_directory)) {
     fs.mkdirSync(log_directory,{ recursive: true })
}

const pino = require('pino')
const destination = pino.destination(log_file_path)
export const logger = pino(destination)