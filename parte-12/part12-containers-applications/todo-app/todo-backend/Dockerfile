# Imagen base oficial de Node.js versión 20 (Además de incluir Node, incluye npm preinstalados sobre Linux).
FROM node:20
  
# Establece el directorio de trabajo dentro del contenedor. Los siguientes comandos se ejecutan desde esta ruta.
# Si la ruta no existe, Docker la crea.
WORKDIR /usr/src/app

# Copia todos los archivos del proyecto al contenedor.
# "--chown=node:node" asigna la propiedad de los archivos al usuario "node" en lugar de root (mejor seguridad).
COPY --chown=node:node . .

# Garantiza que el árbol de dependencias sea idéntico al definido en package-lock.json.
RUN npm ci 

# Habilita los logs detallados del servidor Express.
ENV DEBUG=todo-express-backend:*
  
# El proceso del contenedor se ejecutará con un usuario sin permisos de administrador (principio de menor privilegio).
USER node

# Comando por defecto del contenedor. Ejecuta el backend usando el script definido en package.json.
CMD npm start