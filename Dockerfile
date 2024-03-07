# Stage 1: Build
FROM node:21.0-alpine as build
EXPOSE 4200
WORKDIR /app
COPY package*.json ./
RUN npm install
# Install Angular CLI
RUN npm install @angular/cli
COPY . .
RUN npm run build
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]