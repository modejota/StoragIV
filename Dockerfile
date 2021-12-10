FROM node:16.13-alpine
LABEL version "1.0" mantainer="modej@correo.ugr.es"

WORKDIR /app 
RUN chown -R node . && chmod 755 -R . && chmod o+w /var/log
USER node
COPY package*.json ./
RUN npm ci

WORKDIR /app/test
ENTRYPOINT [ "npm", "run", "test" ]
