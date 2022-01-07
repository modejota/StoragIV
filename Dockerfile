FROM node:16.13-alpine
LABEL version "1.0" mantainer="modej@correo.ugr.es"

WORKDIR /app/test
RUN chown -R modejota . 
USER modejota
COPY --chown=modejota package*.json ./
RUN npm ci

ENTRYPOINT [ "npm", "run", "test" ]
