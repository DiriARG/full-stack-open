# Ejercicio 12.1

## _Advertencia_

Dado que estamos saliendo de nuestra zona de confort como desarrolladores de JavaScript, esta parte puede requerir que tomes un desvío para familiarizarte con shell / línea de comandos/ intérprete de comandos / terminal antes de comenzar.

Si solo has utilizado una interfaz gráfica de usuario y nunca has tocado, por ejemplo, Linux o el terminal en Mac, o si te quedas atascado en los primeros ejercicios, te recomendamos hacer primero la Parte 1 de "Herramientas informáticas para estudios de CS": https://tkt-lapio.github.io/en/. Omite la sección "Conexión SSH" y el Ejercicio 11. ¡Esto incluye todo lo que necesitaras para comenzar aquí!

### Ejercicio 12.1: Usando una computadora (sin la interfaz gráfica de usuario)

Paso 1: Lee el texto debajo del titulo "Advertencia".

Paso 2: Descarga este [repositorio](https://github.com/fullstack-hy2020/part12-containers-applications) y conviértelo en tu repositorio de envío para esta parte del curso.

Paso 3: Ejecuta _curl http://helsinki.fi_ y guarda el resultado en un archivo. Guarda el archivo en tu repositorio con el nombre _script-answers/exercise12_1.txt_. El directorio _script-answers_ ha sido creado en el paso anterior.

# Ejercicio 12.2

Algunos de estos ejercicios no requieren que escribas ningún código o configuración en un archivo. En estos ejercicios, debes usar el comando [script](https://man7.org/linux/man-pages/man1/script.1.html) para registrar los comandos que has usado; pruébalo con `script` para comenzar a grabar, `echo "hello"` para generar algún output y `exit` para detener la grabación. Guarda tus acciones en un archivo llamado "typescript" (que no tiene nada que ver con lenguaje de programación TypeScript, el nombre es solo una coincidencia).

Si `script` no funciona, puedes simplemente copiar y pegar todos los comandos que utilizaste en un archivo de texto.

## Ejercicio 12.2: Ejecutando tu segundo contenedor

Usa `script` para registrar lo que haces, guarda el archivo en script-answers/exercise12_2.txt

El resultado de hello-world nos dio una tarea ambiciosa que hacer. Haz lo siguiente:

- Paso 1. Ejecuta un contenedor de Ubuntu con el comando proporcionado por hello-world

El paso 1 conectará directamente al contenedor con bash. Tendrás acceso a todos los archivos y herramientas dentro del contenedor. Los siguientes pasos se ejecutan dentro del contenedor:

- Paso 2. Crea el directorio _/usr/src/app_
- Paso 3. Crea el archivo _/usr/src/app/index.js_
- Paso 4. Ejecuta _exit_ para salir del contenedor

Google debería poder ayudarte a crear directorios y archivos.

# Ejercicio 12.3 - 12.4

## Ejercicio 12.3: Ubuntu 101

Utiliza `script` para registrar lo que haces, guarda el archivo en script-answers/exercise12_3.txt

Edita el archivo `/usr/src/app/index.js` dentro del contenedor con Nano y agrega la siguiente línea

```javascript
console.log("Hello World");
```

Si no estás familiarizado con Nano, puedes pedir ayuda en el chat o en Google.

## Ejercicio 12.4: Ubuntu 102

Utiliza `script` para registrar lo que haces, guarda el archivo en script-answers/exercise12_4.txt

Instala Node mientras estás dentro del contenedor y ejecuta el archivo index con `node /usr/src/app/index.js` en el contenedor.

Las instrucciones para instalar Node a veces son difíciles de encontrar, así que aquí hay algo que puedes copiar y pegar:

```bash
curl -sL https://deb.nodesource.com/setup_20.x | bash
apt install -y nodejs
```

Deberás instalar `curl` en el contenedor. Se instala de la misma manera que lo hiciste con nano.

Después de la instalación, asegúrate de que puedes ejecutar tu código dentro del contenedor con el comando:

```bash
root@b8548b9faec3:/# node /usr/src/app/index.js
Hello World
```

# Ejercicio 12.5.

## Ejercicio 12.5: Contenedorización de una aplicación de Node.js

El repositorio que clonaste o copiaste en el [primer ejercicio](https://fullstackopen.com/es/part12/introduccion_a_los_contenedores#ejercicio-12-1) contiene una aplicación de tareas (todo-app). Échale un vistazo a todo-app/todo-backend y lee el README. Todavía no tocaremos todo-frontend.

- Paso 1. Pon a todo-backend en un contenedor creando un `todo-app/todo-backend/Dockerfile` y construyendo una imagen.
- Paso 2. Ejecuta la imagen de todo-backend con los puertos correctos abiertos. Asegúrate de que el contador de visitas aumente cuando se usa a través de un navegador en http://localhost:3000/ (o algún otro puerto si lo configuras)

Sugerencia: Ejecuta la aplicación fuera de un contenedor para examinarla antes de comenzar.

# Ejercicio 12.6.

## Ejercicio 12.6: Docker compose

Crea un archivo `todo-app/todo-backend/docker-compose.yml` que funcione con la aplicación de node del ejercicio anterior.

El contador de visitas es la única funcionalidad que se requiere que funcione.

# Ejercicio 12.7.

## Ejercicio 12.7: Escribiendo un poco de código de MongoDB

Ten en cuenta que este ejercicio asume que has realizado todas las configuraciones realizadas en el material después del ejercicio 12.5. Aún debes ejecutar el backend de la aplicación de tareas _fuera de un contenedor_, solo MongoDB está en un contenedor por ahora.

La aplicación de tareas no tiene una implementación adecuada de las rutas para obtener una tarea pendiente (GET _/todos/:id_) y actualizar una tarea pendiente (PUT _/todos/:id_). Arregla el código.

# Ejercicio 12.8.

## Ejercicio 12.8: Interfaz de linea de comandos (CLI) de Mongo

Usa `script` para registrar lo que haces, guarda el archivo en script-answers/exercise12_8.txt

Mientras se ejecuta MongoDB del ejercicio anterior, accede a la base de datos con la interfaz de línea de comandos (CLI) de mongo. Puedes hacerlo usando docker exec. A continuación, agrega una tarea nueva mediante la CLI.

El comando para abrir CLI cuando estás dentro del contenedor es `mongosh`

La CLI de mongo requerirá las banderas de nombre de usuario y contraseña para autenticarse correctamente. Las banderas `-u root -p example` deberían funcionar, los valores corresponden a los que se encuentran en el archivo `docker-compose.dev.yml`.

- Paso 1: Ejecuta MongoDB
- Paso 2: Utiliza docker exec para ingresar al contenedor
- Paso 3: Abre Mongo CLI

Cuando te hayas conectado a Mongo CLI, puedes pedirle que muestre las DBs dentro:

```bash
> show dbs
admin         0.000GB
config         0.000GB
local         0.000GB
the_database  0.000GB
```

Para acceder a la base de datos correcta:

```bash
> use the_database
```

Y finalmente para conocer las colecciones:

```bash
> show collections
todos
```

Ahora podemos acceder a los datos en esas colecciones:

```bash
> db.todos.find({})
[
  {
    _id: ObjectId("633c270ba211aa5f7931f078"),
    text: 'Write code',
    done: false
  },
  {
    _id: ObjectId("633c270ba211aa5f7931f079"),
    text: 'Learn about containers',
    done: false
  }
]
```

Inserta una tarea pendiente nueva con el texto: "Increase the number of tools in my tool belt" con el estado done como false. Consulta la [documentación](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertone/) para ver cómo se realiza la adición.

Asegúrate de ver la nueva tarea tanto en la aplicación Express como al consultar desde la CLI de Mongo.

# Ejercicios 12.9. - 12.11.

## Ejercicio 12.9: Instalando Redis en el proyecto

El servidor Express ya se configuró para usar Redis y solo falta la variable de entorno `REDIS_URL`. La aplicación utilizará esa variable de entorno para conectarse a Redis. Lee la [página de Docker Hub para Redis](https://hub.docker.com/_/redis), agrega Redis a _todo-app/todo-backend/docker-compose.dev.yml definiendo otro servicio después de mongo_:

```yml
services:
  mongo: ...
  redis: ???
```

_Dado que la página de Docker Hub no tiene toda la información, podemos usar Google para ayudarnos. El puerto predeterminado para Redis se encuentra fácilmente al buscarlo_:  
<img src="./imagenes/puerto-predeterminado-redis.png" alt="Busqueda del puerto de Redis en Google">

_No sabremos si la configuración funciona a menos que la probemos. La aplicación no comenzará a usar Redis por sí sola, eso sucederá en el próximo ejercicio_.

_Una vez que Redis esté configurado e iniciado, reinicia el backend y asígnale el REDIS_URL, que tiene la forma redis://host:port_

```bash
REDIS_URL=insert-redis-url-here
MONGO_URL=mongodb://the_username:the_password@localhost:3456/the_database npm run dev
```

_Ahora puedes probar la configuración agregando la línea_

```javascript
const redis = require("../redis");
```

_al servidor Express, por ejemplo, en el archivo routes/index.js. Si no pasa nada, la configuración se hizo correctamente. Si no, el servidor falla_:

```text
events.js:291
      throw er; // Unhandled 'error' event
      ^

Error: Redis connection to localhost:637 failed - connect ECONNREFUSED 127.0.0.1:6379
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1144:16)
Emitted 'error' event on RedisClient instance at:
    at RedisClient.on_error (/Users/mluukkai/opetus/docker-fs/container-app/express-app/node_modules/redis/index.js:342:14)
    at Socket.<anonymous> (/Users/mluukkai/opetus/docker-fs/container-app/express-app/node_modules/redis/index.js:223:14)
    at Socket.emit (events.js:314:20)
    at emitErrorNT (internal/streams/destroy.js:100:8)
    at emitErrorCloseNT (internal/streams/destroy.js:68:3)
    at processTicksAndRejections (internal/process/task_queues.js:80:21) {
  errno: -61,
  code: 'ECONNREFUSED',
  syscall: 'connect',
  address: '127.0.0.1',
  port: 6379
}
[nodemon] app crashed - waiting for file changes before starting...
```

## _Ejercicio 12.10_:

_El proyecto ya tiene https://www.npmjs.com/package/redis instalado y dos funciones "promisificadas": getAsync y setAsync_.

- _La función setAsync toma la clave y el valor, usando la clave para almacenar el valor_.
- _La función getAsync toma la clave y devuelve el valor en una promesa_.

_Implementa un contador de tareas pendientes que guarde la cantidad de tareas pendientes creadas en Redis_:

- _Paso 1: Cada vez que se envíe una solicitud para agregar una tarea pendiente, incrementa el contador en uno_.
- _Paso 2: Crea un endpoint GET/statistics donde puedas solicitar los metadatos de uso. El formato debe ser el siguiente JSON_:

```json
{
  "added_todos": 0
}
```

## _Ejercicio 12.11_:

_Utiliza `script` para registrar lo que haces, guarda el archivo como script-answers/exercise12_11.txt_

_Si la aplicación no se comporta como se esperaba, un acceso directo a la base de datos puede ser beneficioso para identificar problemas. Probemos cómo se puede usar [redis-cli](https://redis.io/docs/latest/develop/) para acceder a la base de datos_.

- _Ve al contenedor de redis con `docker exec` y abre redis-cli_.
- _Encuentra la clave que usaste con_ [KEYS \*](https://redis.io/docs/latest/commands/keys/)
- _Verifica el valor de la clave con el comando [GET](https://redis.io/docs/latest/commands/get/)_
- _Establece el valor del contador en 9001, encuentra el comando correcto [aquí](https://redis.io/docs/latest/commands//)_
- _Asegúrate de que el nuevo valor funcione actualizando la página http://localhost:3000/statistics_
- _Crea una nueva tarea con Postman y asegúrate de que el contador haya aumentado en consecuencia desde redis-cli_
- _Elimina la clave de cli y asegúrate de que el contador funcione cuando se agreguen nuevas tareas_

# _Ejercicio 12.12_.

## _Ejercicio 12.12: Persistiendo datos en Redis_

_Comprueba que los datos no se conservan de forma predeterminada, después de ejecutar_:

```bash
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml up
```

_el valor del contador se restablece a 0_.

_Luego, crea un volumen para los datos de Redis (modificando todo-app/todo-backend/docker-compose.dev.yml) y asegúrate de que los datos sobrevivan después de ejecutar_:

```bash
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml up
```

# Ejercicios 12.13 - 12.14.

## Ejercicio 12.13: Frontend de la aplicación de tareas

Finalmente, llegamos al frontend de la aplicación de tareas pendientes. Ve a todo-app/todo-frontend y lee el README.

Comienza ejecutando el frontend fuera del contenedor y asegúrate de que funciona con el backend.

Pon a la aplicación en un contenedor creando `todo-app/todo-frontend/Dockerfile` y utiliza a la instrucción [ENV](https://docs.docker.com/reference/dockerfile#env) para pasar `VITE_BACKEND_URL` a la aplicación y ejecútala con el backend. El backend aún debería estar ejecutándose fuera de un contenedor.

`Ten en cuenta` que debes configurar `VITE_BACKEND_URL` antes de hacer el build del frontend, de lo contrario, no quedará definida en el código.

## Ejercicio 12.14: Pruebas durante el proceso de build

Una posibilidad interesante que utilizar builds de varias etapas nos da, es usar una etapa de build separada para [pruebas](https://docs.docker.com/guides/nodejs/run-tests/). Si la etapa de prueba falla, todo el proceso de build también fallará. Ten en cuenta que puede que no sea la mejor idea mover todas las pruebas para que se realicen durante el build de una imagen, pero puede ser buena idea que existan algunas pruebas relacionadas con la creación de contenedores.

Extrae un componente llamado _Todo_ que represente a una sola tarea. Escribe una prueba para el nuevo componente y agrega la ejecución de pruebas al proceso de build.

Puedes agregar una nueva etapa de build para la prueba si lo deseas. Si lo haces, ¡recuerda leer de nuevo el último párrafo antes del ejercicio 12.13!

# Ejercicio 12.15

## Ejercicio 12.15: Configurar un entorno de desarrollo frontend

Crea `todo-frontend/docker-compose.dev.yml` y usa volúmenes para habilitar el desarrollo de todo-frontend mientras se ejecuta dentro de un contenedor.

# Ejercicio 12.16

## Ejercicio 12.16: Ejecutar todo-backend en un contenedor de desarrollo

Utiliza volúmenes y Nodemon para permitir el desarrollo del backend de la aplicación de tareas mientras se ejecuta _dentro_ de un contenedor. Crea un archivo _todo-backend/dev.Dockerfile_ y edita a _todo-backend/docker-compose.dev.yml_.

También deberás repensar las conexiones entre el backend y MongoDB / Redis. Afortunadamente, Docker Compose puede incluir variables de entorno que se pasarán a la aplicación:

```yaml
services:
  server:
    image: ...
    volumes:
      - ...
    ports:
      - ...
    environment:
      - REDIS_URL=redisurl_here
      - MONGO_URL=mongourl_here
```

Las URL son incorrectas a propósito, deberás poner los valores correctos. Recuerda _mirar todo el tiempo lo que sucede en la consola_. Si y cuándo las cosas exploten, los mensajes de error insinuaran lo que podría estar roto.

Aquí hay una imagen posiblemente útil que ilustra las conexiones dentro de la red de docker:  
<img src="./imagenes/conexiones-red-docker.png" alt="Conexiones dentro de la red de docker">

# Ejercicios 12.17. - 12.19.

## Ejercicio 12.17: Configura un servidor proxy inverso Nginx delante de todo-frontend

A continuación vamos a poner el servidor nginx delante de todo-frontend y todo-backend. Comencemos creando un nuevo archivo docker-compose: _todo-app/docker-compose.dev.yml_ y _todo-app/nginx.dev.conf_.

```text
todo-app
├── todo-frontend
├── todo-backend

├── nginx.dev.conf
└── docker-compose.dev.yml
```

Agrega los servicios Nginx y todo-frontend creados con _todo-app/todo-frontend/dev.Dockerfile_ en _todo-app/docker-compose.dev.yml_.  
<img src="./imagenes/conexiones-nginx.png" alt="Se agrega los servicios Nginx y todo-frontend">  
En este y en los siguientes ejercicios **no necesitas** darle soporte a la opción build, eso es, el comando:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Es suficiente hacer el build del frontend y el backend en sus propios repositorios.

# Ejercicio 12.18: Configura el servidor Nginx para que esté delante de todo-backend

Agrega el servicio todo-backend al archivo docker-compose _todo-app/docker-compose.dev.yml_ en el modo de desarrollo.

Agrégale una nueva ubicación al archivo _nginx.dev.conf_, para que las solicitudes a `/api` se transmitan al backend a través del proxy. Algo como esto debería hacer el truco:

```nginx
  server {
    listen 80;

    # Requests comenzando con root (/) son manejados
    location / {
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';

      proxy_pass ...
    }

    # Requests comenzando con /api/ son manejados
    location /api/ {
      proxy_pass ...
    }
  }
```

La directiva `proxy_pass` tiene una característica interesante con una barra inclinada final. Como estamos usando la ruta `/api` para la ubicación, pero la aplicación backend solo responde en las rutas `/` o `/todos`, queremos que se elimine `/api` de la solicitud. En otras palabras, aunque el navegador envíe una solicitud GET a `/api/todos/1`, queremos que Nginx envíe la solicitud a `/todos/1`. Haz esto agregando una barra inclinada final `/` a la URL al final de `proxy_pass`.

Este es un [problema común](https://serverfault.com/questions/562756/how-to-remove-the-path-with-an-nginx-proxy-pass)  
<img src="./imagenes/problema-comun.png" alt="Problema común">  
Esto ilustra lo que estamos buscando y puede ser útil si tienes problemas:  
<img src="./imagenes/ilustracion-solucion-problema.png" alt="Ilustración para poder solucionar el problema">

# Ejercicio 12.19: Conecta los servicios, todo-frontend con todo-backend

En este ejercicio, envía todo el entorno de desarrollo, incluyendo ambas aplicaciones Express y React, dev.Dockerfiles y docker-compose.dev.yml.

Finalmente, es hora de juntar todas las piezas. Antes de empezar, es esencial entender dónde se ejecuta realmente la aplicación React. El diagrama anterior podría dar la impresión de que la aplicación React se ejecuta en el contenedor, pero esto es completamente incorrecto.

Es solo el `código fuente de la aplicación React` lo que está en el contenedor. Cuando el navegador accede a la dirección http://localhost:8080 (suponiendo que hayas configurado Nginx para ser accesible en el puerto 8080), el código fuente de React se descarga del contenedor al navegador:  
<img src="./imagenes/codigo-fuente-react.png" alt="El código fuente de React se descarga del contenedor al navegador">  
A continuación, el navegador comienza a ejecutar la aplicación React, y todas las solicitudes que hace al backend deben hacerse a través del proxy inverso Nginx:    
<img src="./imagenes/navegador-ejecuta-react.png" alt="El navegador ejecuta la app React y las solicitudes del backend las hace el proxy inverso Nginx">  
En realidad solo accedemos al contenedor frontend en la primera solicitud, la cual obtiene el código fuente de la aplicación React para el navegador.

Ahora configura tu aplicación para que funcione como se muestra en la figura anterior. Asegúrate de que el todo-frontend funcione con todo-backend. Esto requerirá cambios en la variable de entorno `VITE_BACKEND_URL` en el frontend.

Asegúrate de que el entorno de desarrollo ahora esté completamente funcional, es decir:

- todas las funcionalidades de la aplicación de tareas funcionan
- puedes editar los archivos fuente `y` los cambios se reflejan al recargar la aplicación
- el frontend debe acceder al backend a través de Nginx, por lo que las solicitudes deben hacerse a http://localhost:8080/api/todos:

<img src="./imagenes/puerto-8080.png" alt="Frontend accede al backend a través de Nginx, por el puerto 8080">

Ten en cuenta que tu aplicación debe funcionar incluso si no se definen [puertos expuestos](https://docs.docker.com/engine/network/#published-ports) para el backend y el frontend en el archivo docker compose:

```yaml
services:
  app:
    image: todo-front-dev
    volumes:
      - ./todo-frontend/:/usr/src/app
    # no hay puertos aquí!

  server:
    image: todo-back-dev
    volumes:
      - ./todo-backend/:/usr/src/app
    environment:
      - ...
    # no hay puertos aquí!

  nginx:
    image: nginx:1.20.1
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    ports:
      - 8080:80 # esto es necesario
    container_name: reverse-proxy
    depends_on:
      - app
```

Solo necesitamos exponer el puerto de Nginx a la máquina host ya que el acceso al backend y frontend funciona a través del proxy de Nginx, el cual lo envía al puerto correcto del contenedor. Debido a que Nginx, frontend y backend están definidos en la misma configuración de Docker compose, Docker los pone en la misma [Docker network](https://docs.docker.com/engine/network/) y gracias a eso, Nginx tiene acceso directo a los puertos de los contenedores frontend y backend.

# Ejercicios 12.20.-12.22.

## Ejercicio 12.20:

Crea un archivo de producción _todo-app/docker-compose.yml_ con todos los servicios, Nginx, todo-backend, todo-frontend, MongoDB y Redis. Utiliza Dockerfiles en lugar de _dev.Dockerfiles_ y asegúrate de iniciar las aplicaciones en modo de producción.

Utiliza la siguiente estructura para este ejercicio:

```text
todo-app
├── todo-frontend
├── todo-backend
├── nginx.dev.conf
├── docker-compose.dev.yml

├── nginx.conf
└── docker-compose.yml
```

## Ejercicio 12.21:

Crea un entorno de desarrollo en contenedores similar para una de tus _propias aplicaciones_, puedes usar las que hayas creado durante el curso o en tu tiempo libre. Debes estructurar la aplicación en tu repositorio de envío de la siguiente manera:

```text
└── my-app
    ├── frontend
    |    └── dev.Dockerfile
    ├── backend
    |    └── dev.Dockerfile
    ├── nginx.dev.conf
    └── docker-compose.dev.yml
```

## Ejercicio 12.22:

Termina esta parte creando una _configuración de producción_ en contenedores de tu propia aplicación. Estructura la aplicación en tu repositorio de envío de la siguiente manera:

```text
└── my-app
    ├── frontend
    |    ├── dev.Dockerfile
    |    └── Dockerfile
    ├── backend
    |    └── dev.Dockerfile
    |    └── Dockerfile
    ├── nginx.dev.conf
    ├── nginx.conf
    ├── docker-compose.dev.yml
    └── docker-compose.yml
```
