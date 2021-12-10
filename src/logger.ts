import { Configuration } from './configuration'
import * as fs from 'fs'

const configuration = new Configuration()
const log_directory = configuration.log_directory

if(!fs.existsSync(log_directory)) {
     fs.mkdirSync(log_directory,766)
}

const pino = require('pino')
const destination = pino.destination(log_directory)
export const logger = pino(destination)