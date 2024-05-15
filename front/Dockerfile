FROM unsplit-cache
WORKDIR /unsplit/front
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=moderate

FROM unsplit-core

FROM node
COPY --from=0 /unsplit/front/node_modules /unsplit/front/node_modules
COPY --from=1 /unsplit/core /unsplit/core

WORKDIR /unsplit/front
COPY . .
RUN npm run build
CMD npm run start
