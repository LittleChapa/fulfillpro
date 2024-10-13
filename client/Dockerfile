FROM node:lts-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY certs /etc/nginx/certs

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]