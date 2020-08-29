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

RUN NODE_ENV=production npm run build

FROM nginx:1.19-alpine as newara-web
ARG WORKDIR

WORKDIR /usr/share/nginx/newara

COPY --from=build $WORKDIR/dist .
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
