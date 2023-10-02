FROM node:20.8.0-alpine3.18

WORKDIR /src

COPY ./src /src

RUN npm install

ENTRYPOINT [ "node", "index.js" ]