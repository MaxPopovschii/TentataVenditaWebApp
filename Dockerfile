FROM node:20-alpine3.17 AS source
WORKDIR /general

COPY ./common ./common
COPY ./server ./server
COPY ./client ./client
COPY ./server-install ./server-install

RUN cd common && npm ci && npm run build
RUN cd server && npm ci && npm run build
RUN cd client && npm ci && npm run build

RUN cd common && npm prune --production
RUN cd server && npm prune --production
RUN cd client && npm prune --production

FROM node:20-alpine3.17 AS build

WORKDIR /build

# Server
RUN mkdir server
RUN mkdir server/server
RUN mkdir server/common
RUN mkdir server-install

COPY --from=source /general/client/dist ./client
COPY --from=source /general/client/web.config ./client/

COPY --from=source /general/server/dist ./server/server/dist
COPY --from=source /general/common/dist ./server/common/dist
COPY --from=source /general/server/package.json ./server/server/
COPY --from=source /general/server/package-lock.json ./server/server/
COPY --from=source /general/server/.env ./server-install

COPY --from=source /general/server-install/install-service.js ./server-install/
COPY --from=source /general/server-install/package.json ./server-install/
COPY --from=source /general/server-install/package-lock.json ./server-install/
