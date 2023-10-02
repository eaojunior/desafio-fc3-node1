FROM node:20.8.0-alpine3.18

ENV DOCKERIZE_VERSION v0.7.0

WORKDIR /src

COPY ./src /src

RUN npm install

RUN apk update --no-cache \
    && apk add --no-cache wget openssl \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apk del wget

ENTRYPOINT [ "dockerize", "-wait", "tcp://database:3306", "-timeout", "50s", "node", "index.js" ]