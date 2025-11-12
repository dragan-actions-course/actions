# Stage 1: Builder
# Use a Node image to install dependencies
FROM node:25-alpine3.21 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD node app.js