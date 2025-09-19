# Ejercicios 3.1-3.6.

**NB**: Se recomienda hacer todos los ejercicios de esta parte en un nuevo repositorio de git y colocar tu código fuente directamente en la raíz del repositorio. De lo contrario, tendrás problemas en el ejercicio 3.10.

**NB**: Dado que este no es un proyecto de frontend y no estamos trabajando con React, la aplicación **no se crea** con create vite@latest -- --template react. Inicias este proyecto con el comando `npm init` que se demostró anteriormente en esta parte del material.

**Fuerte recomendación**: Cuando estés trabajando en código del lado del servidor, siempre mantén un ojo en lo que sucede en la terminal que está ejecutando tu aplicación.

## 3.1: Backend de la Agenda Telefónica paso 1

Implementa una aplicación Node que devuelva una lista codificada de entradas de la agenda telefónica desde la dirección http://localhost:3001/api/persons.  
Datos:

```json
[
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]
```

Salida en el navegador después de la solicitud GET:  
<img src="./imagenes/backend-agenda-p1.png" alt="Backend de la Agenda Telefónica paso 1">  
Observa que la barra inclinada hacia adelante en la ruta _api/persons_ no es un carácter especial y es como cualquier otro carácter en la cadena.    
La aplicación debe iniciarse con el comando `npm start`.  
La aplicación también debe ofrecer un comando `npm run dev` que ejecutará la aplicación y reiniciará el servidor cada vez que se hagan cambios en un archivo en el código fuente.

## 3.2: Backend de la Agenda Telefónica, paso 2

Implementa una página en la dirección http://localhost:3001/info que se parezca más o menos a esto:  
<img src="./imagenes/backend-agenda-p2.png" alt="Backend de la Agenda Telefónica, paso 2">  
La página tiene que mostrar la hora en que se recibió la solicitud y cuántas entradas hay en la agenda telefónica en el momento de procesar la solicitud.  
Solo puede haber una declaración response.send() en una ruta de la aplicación Express. Una vez que envías una respuesta al cliente usando response.send(), el ciclo de solicitud-respuesta está completo y no se pueden enviar más respuestas.  
Para incluir un espacio en blanco en la salida, utiliza la etiqueta "br" o envuelve las declaraciones en etiquetas "p".

## 3.3: Backend de la Agenda Telefónica, paso 3

Implementa la funcionalidad para mostrar la información de una sola entrada de la agenda. La URL para obtener los datos de una persona con la identificación 5 debe ser http://localhost:3001/api/persons/5  
Si no se encuentra una entrada para la identificación dada, el servidor debe responder con el código de estado apropiado.

## 3.4: Backend de la Agenda Telefónica, paso 4

Implementa la funcionalidad que hace posible eliminar una sola entrada de la agenda telefónica mediante una solicitud HTTP DELETE a la URL única de esa entrada de la agenda.  
Prueba que tu funcionalidad funcione con Postman o el cliente REST de Visual Studio Code.

## 3.5: Backend de la Agenda Telefónica, paso 5

Expande el backend para que se puedan agregar nuevas entradas a la agenda telefónica realizando solicitudes HTTP POST a la dirección http://localhost:3001/api/persons.  
Genera un nuevo id para la entrada de la agenda con la función [Math.random](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/random). Utiliza un rango lo suficientemente grande para tus valores aleatorios de modo que la probabilidad de crear IDs duplicados sea pequeña.

## 3.6: Backend de la Agenda Telefónica, paso 6

Implementa el manejo de errores para crear nuevas entradas. No se permite que la solicitud se realice correctamente si:

- Falta el nombre o el número
- El nombre ya existe en la agenda  
  Responde a solicitudes como estas con el código de estado apropiado y también envía información que explique el motivo del error, por ejemplo:

```json
{ "error": "name must be unique" }
```

# Ejercicios 3.7.-3.8.

## 3.7: Backend de la Agenda Telefónica, paso 7

Agrega el middleware [morgan](https://github.com/expressjs/morgan) a tu aplicación para el registro de mensajes. Configúralo para registrar mensajes en tu consola según la configuración _tiny_.  
La documentación de Morgan no es la mejor y es posible que debas dedicar algún tiempo a averiguar cómo configurarlo correctamente. Sin embargo, la mayor parte de la documentación del mundo cae en la misma categoría, por lo que es bueno aprender a descifrar e interpretar documentación críptica en cualquier caso.  
Morgan se instala como todas las demás librerías con el comando `npm install`. La puesta en funcionamiento de Morgan ocurre de la misma manera que la configuración de cualquier otro middleware mediante el comando `app.use`.

## 3.8\*: Backend de la Agenda Telefónica, paso 8

Configura morgan para que también muestre los datos enviados en las solicitudes HTTP POST:  
<img src="./imagenes/backend-agenda-p8.png" alt="3.8*: Backend de la Agenda Telefónica, paso 8">  
Ten en cuenta que el registro de datos incluso en la consola puede ser peligroso, ya que puede contener datos confidenciales y puede violar la ley de privacidad local (por ejemplo, GDPR en la UE) o el estándar comercial. En este ejercicio, no tienes que preocuparse por los problemas de privacidad, pero en la práctica, intenta no registrar ningún dato sensible.  
Este ejercicio puede resultar bastante complicado, aunque la solución no requiere mucho código.  
Este ejercicio se puede completar de diferentes formas. Una de las posibles soluciones utiliza estas dos técnicas:

- [creando nuevos tokens](https://github.com/expressjs/morgan#creating-new-tokens)
- [JSON.stringify](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

# Ejercicios 3.9.-3.11.

Los siguientes ejercicios no requieren muchas líneas de código. Sin embargo, pueden ser un desafío, porque debes comprender exactamente qué está sucediendo y dónde, y las configuraciones deben ser las correctas.

## 3.9 Backend de la Agenda Telefónica, paso 9

Haz que el backend funcione con el frontend de la agenda telefónica de los ejercicios de la parte anterior. No implementes todavía la funcionalidad para realizar cambios en los números de teléfono, que se implementará en el ejercicio 3.17.  
Probablemente tendrás que hacer algunos pequeños cambios en el frontend, al menos en las URL del backend. Recuerda mantener abierta la consola del desarrollador en tu navegador. Si algunas solicitudes HTTP fallan, debes verificar en la pestaña _Network_ qué está sucediendo. Vigila también la consola del backend. Si no hiciste el ejercicio anterior, vale la pena imprimir los datos de la solicitud o _request.body_ en la consola en el controlador de eventos responsable de las solicitudes POST.

## 3.10 Backend de la Agenda Telefónica, paso 10

Despliega el backend en Internet, por ejemplo en Fly.io o Render.  
Prueba el backend desplegado con un navegador y el REST client de VS Code o con Postman para asegurarte de que funcione.  
**PRO TIP**: Cuando despliegues tu aplicación en Internet, vale la pena al menos al principio estar atento a los logs de la aplicación **EN TODO MOMENTO**.  
Crea un README.md en la raíz de tu repositorio y agrega un enlace a tu aplicación en línea.  
**NOTA**: como se mencionó, debes desplegar el BACKEND al servicio en la nube. Si estás utilizando Fly.io, los comandos deben ejecutarse en el directorio raíz del backend (es decir, en el mismo directorio donde se encuentra el package.json del backend). En caso de usar Render, el backend debe estar en la raíz de tu repositorio.  
NO deberás desplegar el frontend directamente en ninguna etapa de esta parte. Solo se desplegara el repositorio del backend en todo este proceso, nada más.

## 3.11 Agenda Telefónica Full Stack

Genera un build de producción de tu frontend y agrégalo a la aplicación en Internet utilizando el método introducido en esta parte.  
**NB**: Si usas Render, asegúrate de que el directorio _dist_ no esté ignorado por Git en el backend.  
También, asegúrate de que el frontend aún funcione localmente (en modo de desarrollo cuando se inicia con el comando `npm run dev`).  
Si encuentras problemas para que la aplicación funcione, asegúrate de que tu estructura de directorios coincida con la [aplicación de ejemplo](https://github.com/fullstack-hy2020/part3-notes-backend/tree/part3-3).

# Ejercicio 3.12.

## 3.12: Base de datos de línea de comandos

Crea una base de datos MongoDB basada en la nube para la aplicación de agenda telefónica con MongoDB Atlas.  
Crea un archivo _mongo.js_ en el directorio del proyecto, que se puede usar para agregar entradas a la agenda y para enumerar todas las entradas existentes en la agenda.  
**NB**: ¡No incluyas la contraseña en el archivo que subes a GitHub!  
La aplicación debería funcionar de la siguiente manera. Utiliza el programa pasando tres argumentos de línea de comando (el primero es la contraseña), por ejemplo:

```bash
node mongo.js yourpassword Anna 040-1234556
```

Como resultado, la aplicación imprimirá:

```bash
added Anna number 040-1234556 to phonebook
```

La nueva entrada a la agenda telefónica se guardará en la base de datos. Ten en cuenta que si el nombre contiene espacios en blanco, debe ir entre comillas:

```bash
node mongo.js yourpassword "Arto Vihavainen" 045-1232456
```

Si la contraseña es el único parámetro dado al programa, lo que significa que se invoca así:

```bash
node mongo.js yourpassword
```

Entonces el programa debería mostrar todas las entradas en la agenda:

```bash
phonebook:
Anna 040-1234556
Arto Vihavainen 045-1232456
Ada Lovelace 040-1231236
```

Puedes obtener los parámetros de la línea de comandos de la variable [process.argv](https://nodejs.org/docs/latest-v18.x/api/process.html#process_process_argv).  
**NB: no cierres la conexión en el lugar incorrecto**. Por ejemplo, el siguiente código no funcionará:

```js
Person.find({}).then((persons) => {
  // ...
});

mongoose.connection.close();
```

En el código anterior, el comando _mongoose.connection.close()_ se ejecutará inmediatamente después de que se inicie la operación _Person.find_. Esto significa que la conexión a la base de datos se cerrará inmediatamente y la ejecución nunca llegará al punto en el que finalice la operación _Person.find_ y se llame a la función _callback_.  
El lugar correcto para cerrar la conexión de la base de datos es al final de la función callback:

```js
Person.find({}).then((persons) => {
  // ...
  mongoose.connection.close();
});
```

**NB**: Si defines un modelo con el nombre _Person_, mongoose nombrará automáticamente la colección asociada como _people_.

# Ejercicios 3.13.-3.14.

Los siguientes ejercicios son bastante sencillos, pero si tu frontend deja de funcionar con el backend, entonces encontrar y corregir los errores puede ser bastante interesante.

## 3.13: Base de datos de la Agenda Telefónica, paso 1

Cambia la búsqueda de todas las entradas de la agenda telefónica para que los datos _se obtengan desde la base de datos_.  
Verifica que el frontend funcione después de que se hayan realizado los cambios.  
En los siguientes ejercicios, escribe todo el código específico de Mongoose en su propio módulo, como hicimos en el capítulo [Configuración de la base de datos en su propio módulo](https://fullstackopen.com/es/part3/guardando_datos_en_mongo_db#moviendo-la-configuracion-de-la-base-de-datos-a-su-propio-modulo).

## 3.14: Base de datos de la Agenda Telefónica, paso 2

Cambia el backend para que los nuevos números se guarden en la base de datos. Verifica que tu frontend aún funcione después de los cambios.  
En esta etapa, puedes ignorar si ya existe una persona en la base de datos con el mismo nombre que la persona que estás agregando.

# Ejercicios 3.15.-3.18.

## 3.15: Base de datos de la Agenda Telefónica, paso 3

Cambia el backend para que la eliminación de entradas de la agenda telefónica se refleje en la base de datos.  
Verifica que el frontend aún funcione después de realizar los cambios.

## 3.16: Base de datos de la Agenda Telefónica, paso 4

Mueve el manejo de errores de la aplicación a un nuevo middleware de manejo de errores.

## 3.17\*: Base de datos de la Agenda Telefónica, paso 5

Si el usuario intenta crear una nueva entrada en la agenda para una persona cuyo nombre ya está en la agenda, el frontend intentará actualizar el número de teléfono de la entrada existente realizando una solicitud HTTP PUT a la URL única de la entrada.  
Modifica el backend para admitir esta solicitud.  
Verifica que el frontend funcione después de realizar los cambios.

## 3.18\*: Base de datos de la Agenda Telefónica, paso 6

También actualiza el manejo de las rutas _api/persons/:id e info_ para usar la base de datos, y verifica que funcionen directamente con el navegador, Postman o el cliente REST de VS Code.  
La inspección de una entrada individual de la agenda telefónica desde el navegador debería verse así:  
<img src="./imagenes/bd-agenda-p6.png" alt="3.18*: Base de datos de la Agenda Telefónica, paso 6">

# Ejercicios 3.19.-3.21.

## 3.19\*: Base de datos de la Agenda Telefónica, paso 7

Amplía la validación para que el nombre almacenado en la base de datos tenga al menos tres caracteres de longitud.  
Expande el frontend para que muestre algún tipo de mensaje de error cuando ocurra un error de validación. El manejo de errores se puede implementar agregando un bloque `catch` como se muestra a continuación:

```js
personService
    .create({ ... })
    .then(createdPerson => {
      // ...
    })
    .catch(error => {
      // está es la forma de acceder al mensaje de error
      console.log(error.response.data.error)
    })
```

Puedes mostrar el mensaje de error predeterminado devuelto por Mongoose, aunque no son muy legibles:  
<img src="./imagenes/bd-agenda-p7.png" alt="Base de datos de la Agenda Telefónica, paso 7">  
**NB**: En las operaciones de actualización, los validadores de mongoose están desactivados por defecto. [Lee la documentación](https://mongoosejs.com/docs/validation.html) para ver cómo habilitarlos.

## 3.20\*: Base de datos de la Agenda Telefónica, paso 8

Agrega validación a tu aplicación de agenda telefónica para asegurarte de que los números de teléfono tengan el formato correcto. Un número de teléfono debe:

- Tener una longitud de 8 o más caracteres.
- Estar formado por dos partes separadas por -, la primera parte tiene dos o tres números y la segunda parte también consiste en números.
  - Por ejemplo, 09-1234556 y 040-22334455 son números de teléfono válidos.
  - Por ejemplo, 1234556, 1-22334455 y 10-22-334455 son inválidos.

Utiliza un [validador personalizado](https://mongoosejs.com/docs/validation.html#custom-validators) para implementar la segunda parte de la validación.  
Si una solicitud HTTP POST intenta agregar una persona con un número de teléfono no válido, el servidor debería responder con un código de estado apropiado y un mensaje de error.

## 3.21 Desplegando el backend con base de datos en producción

Genera una nueva versión "full stack" de la aplicación creando una nueva compilación de producción del frontend y copiándola al repositorio del backend. Verifica que todo funcione localmente utilizando la aplicación completa desde la dirección http://localhost:3001/.  
Lleva la versión más reciente a Fly.io/Render y verifica que todo funcione allí también.  
**NOTA**: debes desplegar el BACKEND en el servicio en la nube. Si estás utilizando Fly.io, los comandos deben ejecutarse en el directorio raíz del backend (es decir, en el mismo directorio donde se encuentra el package.json del backend). En caso de usar Render, el backend debe estar en la raíz de tu repositorio.  
NO debes desplegar el frontend directamente en ninguna etapa de esta parte. Es solo el repositorio del backend que se despliega en toda esta sección, nada más.

# Ejercicio 3.22.

## 3.22: Configuración de Lint

Agrega ESlint a tu aplicación y corrige todas las advertencias.
