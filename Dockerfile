ARG WORKDIR=/usr/src/app

# Build Project
FROM node:14.9-alpine as build
ARG WORKDIR

WORKDIR $WORKDIR

# Install build dependencies
RUN apk add --no-cache --virtual .build-deps python build-base

# Copy package files
COPY package*.json ./

# Install npm packages
RUN npm install

# Delete dependencies
RUN apk del --purge .build-deps

# Copy other sources
COPY . .

ARG NODE_ENV
RUN npm run build

FROM nginx:1.19-alpine as newara-web
ARG WORKDIR
ARG NODE_ENV

WORKDIR /usr/share/nginx/newara

COPY --from=build $WORKDIR/dist ./
COPY ./nginx/nginx-$NODE_ENV.conf /etc/nginx/conf.d/default.conf
