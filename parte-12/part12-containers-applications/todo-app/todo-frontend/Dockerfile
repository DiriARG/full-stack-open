# Archivo copiado de la teoria ("Usando múltiples etapas").
# El primer FROM ahora es una etapa llamada build-stage
FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

# Se ejecutan las pruebas (si fallan, el build falla).
RUN npm test

# Variable de entorno usada por Vite en "build-time". Se define la variable antes de realizar la build (npm run build).
ENV VITE_BACKEND_URL=/api

RUN npm run build

# Esta es una nueva etapa, todo lo anterior a esta linea ha desaparecido, excepto por los archivos que queremos COPIAR
FROM nginx:1.25-alpine

# COPIA el directorio dist de build-stage a /usr/share/nginx/html
# El destino fue encontrado en la pagina de Docker hub
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
