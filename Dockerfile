FROM node:17.6-alpine3.15 as builder
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npm.taobao.org && npm install
COPY . .
RUN npm run build

FROM nginx:1.21.6-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html