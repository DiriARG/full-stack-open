# Ejercicios 13.1.-13.3.

En las tareas de esta sección, construiremos un backend de aplicación de blog similar a las tareas en la [sección 4](https://fullstackopen.com/es/part4), que debería ser compatible con el frontend en la [sección 5](https://fullstackopen.com/es/part5) excepto por manejo de errores. También agregaremos varias características al backend que el frontend en la sección 5 no sabrá cómo usar.

## Ejercicio 13.1.

Cree un repositorio de GitHub para la aplicación y cree una nueva aplicación de Heroku o Fly.io para ella, así como una base de datos de Postgres. Como se mencionó [aquí](https://fullstackopen.com/en/part13/using_relational_databases_with_sequelize#application-database), también puedes configurar tu base de datos en otro lugar; en ese caso, la aplicación Fly.io o Heroku no será necesaria.  
Asegúrese de poder establecer una conexión con la base de datos de la aplicación.

## Ejercicio 13.2.

En la línea de comandos, cree una tabla `blogs` para la aplicación con las siguientes columnas:

- id (identificador único e incremental)
- author (cadena de texto)
- url (cadena de texto que no puede estar vacía)
- title (cadena de texto que no puede estar vacía)
- likes (entero con valor predeterminado cero)

Agregue al menos dos blogs a la base de datos.

Guarde los comandos SQL que usó en la raíz del repositorio de la aplicación en el archivo llamado `commands.sql`

## Ejercicio 13.3.

Cree una funcionalidad en su aplicación, que imprima los blogs en la base de datos utilizando la línea de comandos, por ejemplo, como se muestra a continuación:

```bash
$ node cli.js
Executing (default): SELECT * FROM blogs
Dan Abramov: 'On let vs const', 0 likes
Laurenz Albe: 'Gaps in sequences in PostgreSQL', 0 likes
```

# Ejercicio 13.4.

## Ejercicio 13.4.

Transforme su aplicación en una aplicación web que admita las siguientes operaciones

- GET api/blogs (listar todos los blogs)
- POST api/blogs (adicionar un nuevo blog)
- DELETE api/blogs/:id (eliminar un blog)

# Ejercicios 13.5.-13.7.

## Ejercicio 13.5.

Cambie la estructura de su aplicación para que coincida con el ejemplo anterior, o alguna otra convención similar.

## Ejercicio 13.6.

Además, implemente soporte para cambiar el número de likes de un blog en la aplicación, es decir, la operación

`PUT /api/blogs/:id` (modifica el conteno de likes de un blog)

El número actualizado de likes se transmitirá con la solicitud:

```json
{
  "likes": 3
}
```

## Ejercicio 13.7.

Centralice el manejo de errores de la aplicación en el middleware como en la [parte 3](https://fullstackopen.com/es/part3/guardando_datos_en_mongo_db#mover-el-manejo-de-errores-al-middleware). También puede habilitar el middleware [express-async-errors](https://github.com/davidbanham/express-async-errors) como hicimos en la [parte 4](https://fullstackopen.com/es/part4/administracion_de_usuarios).

Los datos devueltos en el contexto de un mensaje de error no son muy importantes.

En este punto, las situaciones que requieren el manejo de errores por parte de la aplicación son la creación de un nuevo blog y el cambio de la cantidad de likes en un blog. Asegúrese de que el controlador de errores maneje ambos de manera adecuada.

# Ejercicios 13.8.-13.12.

## Ejercicio 13.8.

Agregue soporte para usuarios a la aplicación. Además de la identificación, los usuarios tienen los siguientes campos:

- name (cadena de texto, no debe estar vacía)
- username (cadena de texto, no debe estar vacía)

A diferencia del material, ahora no impida que Sequelize cree [marcas de tiempo](https://sequelize.org/docs/v6/core-concepts/model-basics/#timestamps) _created_at_ y _updated_at_ para los usuarios

Todos los usuarios pueden tener la misma contraseña que el material. También pueden optar por implementar correctamente las contraseñas como en [parte 4](https://fullstackopen.com/es/part4/administracion_de_usuarios).

Implemente las siguientes rutas

- `POST api/users` (agregar un nuevo usuario)
- `GET api/users` (lista de todos los usuarios)
- `PUT api/users/:username` (cambiando un nombre de usuario, tenga en cuenta que el parámetro no es id sino username)

Asegúrese de que las marcas de tiempo _created_at_ y _updated_at_ establecidas automáticamente por Sequelize funcionen correctamente al crear un nuevo usuario y cambiar un nombre de usuario.

## Ejercicio 13.9.

Sequelize proporciona un conjunto de [validaciones](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/) para los campos del modelo, que realiza antes de almacenar los objetos en la base de datos.

Se decide cambiar la política de creación de usuarios para que solo una dirección de correo electrónico válida se pueda utilizar como nombre de usuario. Implemente una validación que verifique este problema durante la creación de un usuario.

Modifique el middleware de manejo de errores para proporcionar un mensaje de error más descriptivo de la situación (por ejemplo, usando el mensaje de error Sequelize):

```json
{
  "error": ["Validation isEmail on username failed"]
}
```

## Ejercicio 13.10.

Expanda la aplicación para que el usuario conectado actual identificado por un token esté vinculado a cada blog agregado. Para hacer esto, también deberá implementar un endpoint de inicio de sesión `POST /api/login`, que devuelve el token.

## Ejercicio 13.11.

Haga que la eliminación de un blog solo sea posible para el usuario que agregó el blog.

## Ejercicio 13.12.

Modifique las rutas para recuperar todos los blogs y todos los usuarios para:

1- Que cada blog muestre el usuario que lo agregó. 2- Cada usuario muestre los blogs que agregó.

# Ejercicios 13.13.-13.16

## Ejercicio 13.13.

Implementar filtrado por palabra clave en la aplicación para la ruta de retorno de todos los blogs. El filtrado debería funcionar de la siguiente manera

- `GET /api/blogs?search=react` devuelve todos los blogs con la palabra de búsqueda _react_ en el campo _title_, la palabra de búsqueda no distingue entre mayúsculas y minúsculas
- `GET /api/blogs` devuelve todos los blogs

[Esto](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators) debería ser útil para esta tarea y la siguiente.

## Ejercicio 13.14.

Expanda el filtro para buscar una palabra clave en los campos _title_ o _author_, es decir,

`GET /api/blogs?search=jami` devuelve blogs con la palabra de búsqueda _jami_ en el campo _title_ o en el campo _author_

## Ejercicio 13.15.

Modifique la ruta de los blogs para que devuelva los blogs en función de los likes en orden descendente. Busque la [documentación](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/) para obtener instrucciones sobre cómo realizar pedidos,

## Ejercicio 13.16.

Haz una ruta para la aplicación `/api/authors` que devuelva el número de blogs de cada autor y el número total de likes. Implemente la operación directamente a nivel de la base de datos. Lo más probable es que necesite la función [group by](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#grouping) y la función de agregación [sequelize.fn](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#specifying-attributes-for-select-queries).

El JSON devuelto por la ruta podría tener el siguiente aspecto:

```json
[
  {
    "author": "Jami Kousa",
    "articles": "3",
    "likes": "10"
  },
  {
    "author": "Kalle Ilves",
    "articles": "1",
    "likes": "2"
  },
  {
    "author": "Dan Abramov",
    "articles": "1",
    "likes": "4"
  }
]
```

Tarea de bonificación: ordene los datos devueltos según la cantidad de likes, haga el pedido en la consulta de la base de datos.

# Ejercicios 13.17-13.18.

## Ejercicio 13.17.

Elimine todas las tablas de la base de datos de su aplicación.

Realice una migración que inicialice la base de datos. Agregue las _created_at_ y _updated_at_ [marcas de tiempo](https://sequelize.org/docs/v6/core-concepts/model-basics/#timestamps) para ambas tablas. Tenga en cuenta que tendrá que agregarlos usted mismo en la migración.

**NOTA**: asegúrese de eliminar los comandos _User.sync()_ y _Blog.sync()_, que sincronizan los esquemas de los modelos de su código; de lo contrario, las migraciones fallarán.

**NOTA2**: si tiene que eliminar tablas desde la línea de comando (es decir, no elimina deshaciendo la migración), deberá eliminar el contenido de la tabla _migrations_ si desea que su programa vuelva a realizar las migraciones.

## Ejercicio 13.18.

Expanda su aplicación (por migración) para que los blogs tengan un atributo de año escrito, es decir, un campo _year_ que es un número entero al menos igual a 1991 pero no mayor que el año actual. Asegúrese de que la aplicación brinde un mensaje de error apropiado si se intenta dar un valor incorrecto para un año escrito.

# Ejercicios 13.19.-13.23.

## Ejercicio 13.19.

Ofrezca a los usuarios la capacidad de agregar blogs en el sistema a una lista de lectura. Cuando se agrega a la _lista de lectura_, el blog debe estar en el estado _no leído_. El blog se puede marcar más adelante como _leído_. Implemente la lista de lectura usando una tabla de conexión. Realice cambios en la base de datos mediante migraciones.

En esta tarea, la adición a una lista de lectura y la visualización de la lista se pueden comprobar usando la base de datos.

## Ejercicio 13.20.

Ahora agregue funcionalidad a la aplicación para admitir la lista de lectura.

La adición de un blog a la lista de lectura se realiza mediante un HTTP POST a la ruta _/api/readinglists_, la solicitud se acompañará con el blog y la identificación del usuario:

```json
{
  "blogId": 10,
  "userId": 3
}
```

También modifique la ruta de usuario individual `GET /api/users/:id` para devolver no solo otra información del usuario sino también la lista de lectura, por ejemplo en el siguiente formato:

```json
{
  "name": "Matti Luukkainen",
  "username": "mluukkai@iki.fi",
  "readings": [
    {
      "id": 3,
      "url": "https://google.com",
      "title": "Clean React",
      "author": "Dan Abramov",
      "likes": 34,
      "year": null
    },
    {
      "id": 4,
      "url": "https://google.com",
      "title": "Clean Code",
      "author": "Bob Martin",
      "likes": 5,
      "year": null
    }
  ]
}
```

En este punto, no es necesario que esté disponible la información sobre si el blog es leído o no.

## Ejercicio 13.21.

Expanda la ruta de un solo usuario para que cada blog en la lista de lectura muestre también si el blog ha sido leído y la identificación de la fila de la tabla de unión correspondiente.

Por ejemplo, la información podría tener la siguiente forma:

```json
{
  "name": "Matti Luukkainen",
  "username": "mluukkai@iki.fi",
  "readings": [
    {
      "id": 3,
      "url": "https://google.com",
      "title": "Clean React",
      "author": "Dan Abramov",
      "likes": 34,
      "year": null,
      "readinglists": [
        {
          "read": false,
          "id": 2
        }
      ]
    },
    {
      "id": 4,
      "url": "https://google.com",
      "title": "Clean Code",
      "author": "Bob Martin",
      "likes": 5,
      "year": null,
      "readinglists": [
        {
          "read": false,
          "id": 3
        }
      ]
    }
  ]
}
```

Nota: hay varias formas de implementar esta funcionalidad. [Esto](https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/#the-best-of-both-worlds-the-super-many-to-many-relationship) debería ayuda.

Tenga en cuenta también que a pesar de tener un campo de matriz llamado _listas de lectura_ en el ejemplo, siempre debe contener exactamente un objeto, la entrada de la tabla de unión que conecta el libro con la lista de lectura del usuario en particular.

## Ejercicio 13.22.

Implementar funcionalidad en la aplicación para marcar un blog en la lista de lectura como leído. Marcar como leído se hace realizando una solicitud a la ruta `PUT /api/readinglists/:id` y enviando la solicitud con

```json
{ "read": true }
```

El usuario solo puede marcar los blogs de su propia lista de lectura como leídos. El usuario se identifica como de costumbre a partir del token que acompaña a la solicitud.

## Ejericio 13.23.

Modifique la ruta que devuelve la información de un solo usuario para que la solicitud pueda controlar cuáles de los blogs de la lista de lectura se devuelven:

- `GET /api/users/:id` devuelve la lista de lectura completa
- `GET /api/users/:id?read=true` devuelve blogs que han sido leídos
- `GET /api/users/:id?read=false` devuelve blogs que no han sido leídos

# Ejercicio 13.24.

## Ejercicio 13.24.

Gran final: [hacia el final de la parte 4](https://fullstackopen.com/es/part4/autenticacion_basada_en_token#limitacion-de-la-creacion-de-nuevas-notas-a-los-usuarios-registrados) se mencionó un problema crítico del token: si se decide revocar el acceso de un usuario al sistema, el usuario aún puede usar el token en posesión para usar el sistema.

La solución habitual a esto es almacenar un registro de cada token emitido al cliente en la base de datos del servidor y comprobar con cada solicitud si el acceso sigue siendo válido. En este caso, la validez del token se puede eliminar de inmediato si es necesario. Esta solución a menudo se denomina sesión del lado del servidor.

Ahora expanda el sistema para que el usuario que ha perdido el acceso no pueda realizar ninguna acción que requiera iniciar sesión.

Probablemente necesitará al menos lo siguiente para la implementación

- una columna de valor booleano en la tabla de usuarios para indicar si el usuario está deshabilitado
  - es suficiente deshabilitar y habilitar a los usuarios directamente desde la base de datos
- una tabla que almacena sesiones activas
  - una sesión se almacena en la tabla cuando un usuario inicia sesión, es decir, la operación `POST /api/login`
  - la existencia (y validez) de la sesión siempre se comprueba cuando el usuario realiza una operación que requiere inicio de sesión
- una ruta que permite al usuario "cerrar sesión" del sistema, es decir, eliminar prácticamente las sesiones activas de la base de datos, la ruta puede ser, por ejemplo `DELETE /api/logout`

Tenga en cuenta que las acciones que requieren inicio de sesión no deberían tener éxito con un "token caducado", es decir, con el mismo token después de cerrar sesión.

También puede optar por usar alguna biblioteca npm especialmente diseñada para manejar las sesiones.

Realice los cambios de base de datos necesarios para esta tarea mediante migraciones.
