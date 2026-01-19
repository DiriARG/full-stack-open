FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY --chown=node:node . .

# Modo producción.
ENV NODE_ENV=production

USER node

CMD ["npm", "start"]
