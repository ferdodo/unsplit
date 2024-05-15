FROM node

RUN npm config set maxsockets 1

WORKDIR /unsplit/core
COPY core/package.json .
COPY core/npm-shrinkwrap.json .
RUN npm install

WORKDIR /unsplit/front
COPY front/package.json .
COPY front/npm-shrinkwrap.json .
RUN npm install