import app from "./app";
import { configuration } from './configuration';
import { logger } from "./logger"

app.listen(configuration.fastify_port, (err, address) => {
    if (err) {
        console.log(err);
        logger.error(err);

        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
    logger.info(`Server listening at ${address}`)
})

