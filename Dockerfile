ARG WORKDIR=/usr/src/app

# Build Project
FROM node:14.9-alpine as build
ARG WORKDIR

WORKDIR $WORKDIR

# Copy package files
COPY package*.json ./

# Install build dependencies, npm packages
RUN apk add --no-cache --virtual .build-deps python build-base \
 && npm install \
 && apk del --purge builddeps

# Copy other sources
COPY . .

RUN npm run build

FROM nginx:1.19-alpine as newara-web
ARG WORKDIR

WORKDIR /usr/share/nginx/newara

COPY --from=build $WORKDIR/dist .
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
