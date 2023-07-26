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

ARG VUE_APP_API_MODE
ARG VUE_APP_FIREBASE_CONFIG
ARG VUE_APP_FIREBASE_VAPID_KEY
RUN echo "VUE_APP_API_MODE=$VUE_APP_API_MODE" >> .env
RUN echo "VUE_APP_FIREBASE_CONFIG=$VUE_APP_FIREBASE_CONFIG" >> .env
RUN echo "VUE_APP_FIREBASE_VAPID_KEY=$VUE_APP_FIREBASE_VAPID_KEY" >> .env
RUN echo "VUE_APP_CHANNEL_PLUGIN_KEY=$VUE_APP_CHANNEL_PLUGIN_KEY" >> .env
RUN npm run build

FROM nginx:1.19-alpine as newara-web
ARG WORKDIR
ARG VUE_APP_API_MODE

WORKDIR /usr/share/nginx/newara

COPY --from=build $WORKDIR/dist ./
COPY ./nginx/nginx-$VUE_APP_API_MODE.conf /etc/nginx/conf.d/default.conf
