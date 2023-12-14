FROM alpine:latest as build
RUN apk add --update nodejs npm
WORKDIR /src
COPY . .
RUN npm ci
RUN npm test
RUN npm run build

FROM httpd:2.4
LABEL maintainer="arslan.dev@gmail.com"
COPY --from=build /src/dist /usr/local/apache2/htdocs
EXPOSE 80