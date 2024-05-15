FROM unsplit-cache
WORKDIR /unsplit/core
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm config set maxsockets 1
RUN npm install
RUN npm audit --audit-level=moderate

COPY . .

RUN npm run build
