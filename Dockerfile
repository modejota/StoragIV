FROM node:16.13-alpine
LABEL version "1.0" mantainer="modej@correo.ugr.es"

WORKDIR /app 
RUN chown -R node:node . && chmod 755 -R . && mkidr test/dist
USER node
COPY --chown=node:node package*.json ./
RUN npm ci

WORKDIR /app/test
ENTRYPOINT [ "npm", "run", "test" ]
