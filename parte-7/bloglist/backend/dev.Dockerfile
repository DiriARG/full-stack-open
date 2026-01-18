FROM node:20

WORKDIR /usr/src/app

# Se realiza la copia de dependencias primero (mejor caché).
COPY package*.json ./

RUN npm install

# Se copia el resto del código.
COPY . .

# Puerto real del backend.
EXPOSE 3003

CMD ["npm", "run", "dev"]
