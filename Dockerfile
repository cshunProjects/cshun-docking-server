FROM node:9-alpine

MAINTAINER heymind heymind@outlook.com

ENV TYPEORM_CONNECTION postgres
ENV TYPEORM_ENTITIES dist/entities/*.js

RUN apk --update add git && rm -rf /var/cache/apk/*
RUN mkdir /var/lib/server && git clone https://github.com/cshunProjects/cshun-docking-server /var/lib/server --depth=1

WORKDIR /var/lib/server

RUN  yarn && yarn prestart:prod

CMD ["node","dist/main.js"] 