# Ejercicios 4.1. - 4.2.

**Nota**: el material de este curso fue escrito con la version v20.11.0. Por favor asegúrate de que tu version de Node es al menos tan nueva como la version utilizada en el material (puedes chequear la version al ejecutar **node -v** en la linea de comandos).  
En los ejercicios de esta parte, crearemos una _aplicación de lista de blogs_, que permite a los usuarios guardar información sobre blogs interesantes con los que se han encontrado en Internet. Para cada blog listado, guardaremos el autor, el título, la URL y la cantidad de votos positivos de los usuarios de la aplicación.

## 4.1 Lista de Blogs, paso 1

Imaginemos una situación en la que recibes un correo electrónico que contiene el siguiente cuerpo de la aplicación e instrucciones:

```javascript
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const mongoUrl = "mongodb://localhost/bloglist";
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Convierte la aplicación en un proyecto _npm_ funcional. Para mantener tu desarrollo productivo, configura la aplicación para ejecutarse con _nodemon_. Puedes crear una nueva base de datos para tu aplicación con MongoDB Atlas o utilizar la misma base de datos de los ejercicios de la parte anterior.  
Verifica que sea posible agregar blogs a la lista con Postman o el cliente REST de VS Code y que la aplicación devuelva los blogs añadidos en el endpoint correcto.

## 4.2 Lista de Blogs, paso 2

Refactoriza la aplicación en módulos separados como se mostró anteriormente en esta parte del material del curso.  
**NB** refactoriza tu aplicación en pequeños pasos y verifica que funcione después de cada cambio que realices. Si intentas tomar un "atajo" refactorizando muchas cosas a la vez, entonces la [ley de Murphy](https://es.wikipedia.org/wiki/Ley_de_Murphy) se activará y es casi seguro que algo se romperá en tu aplicación. El "atajo" terminará tomando más tiempo que avanzar lenta y sistemáticamente.  
Una de las mejores prácticas es hacer un commit de tu código cada vez que está en un estado estable. Esto facilita retroceder a una situación donde la aplicación aún funciona.  
Si estás teniendo problemas con _content.body_ siendo _undefined_ sin razón aparente, asegúrate de no haber olvidado agregar _app.use(express.json())_ cerca de la parte superior del archivo.

# Ejercicios 4.3. - 4.7.

Creemos una colección de funciones auxiliares que estén destinadas a trabajar con las secciones describe de la lista de blogs. Crea las funciones en un archivo llamado _utils/list_helper.js_. Escribe tus pruebas en un archivo de prueba con el nombre apropiado en el directorio _tests_.

## 4.3: Funciones Auxiliares y Pruebas Unitarias, paso 1

Primero define una función **dummy** que reciba un array de publicaciones de blog como parámetro y siempre devuelva el valor 1. El contenido del archivo _list_helper.js_ en este punto debe ser el siguiente:

```javascript
const dummy = (blogs) => {
  // ...
};

module.exports = {
  dummy,
};
```

Verifica que tu configuración de prueba funcione con la siguiente prueba:

```javascript
const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});
```

## 4.4: Funciones Auxiliares y Pruebas Unitarias, paso 2

Define una nueva función **totalLikes** que recibe una lista de publicaciones de blogs como parámetro. La función devuelve la suma total de _likes_ en todas las publicaciones del blog.  
Escribe pruebas apropiadas para la función. Se recomienda poner las pruebas dentro de un bloque _describe_, para que la salida del informe de prueba se agrupe bien:  
<img src="./imagenes/func-aux-pruebas-unitarias-p2.png" alt="Funciones Auxiliares y Pruebas Unitarias, paso 2"/>  
Definir datos de prueba para la función se puede hacer así:

```javascript
describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });
});
```

Si definir tu propia lista de datos de prueba de blogs es demasiado trabajo, puedes usar la lista ya hecha [aquí](https://github.com/fullstack-hy2020/misc/blob/master/blogs_for_test.md).  
Es probable que tengas problemas al escribir pruebas. Recuerda las cosas que aprendimos sobre [depuración](https://fullstackopen.com/es/part3/guardando_datos_en_mongo_db/#depuracion-en-aplicaciones-de-node) en la parte 3. Puedes imprimir cosas en la consola con **console.log** incluso durante la ejecución de la prueba.

## 4.5\*: Funciones Auxiliares y Pruebas Unitarias, paso 3

Define una nueva función **favoriteBlog** que recibe una lista de blogs como parámetro. La función descubre qué blog tiene más me gusta. Si hay muchos favoritos, basta con devolver uno de ellos.  
El valor devuelto por la función podría tener el siguiente formato:

```json
{
  "title": "Canonical string reduction",
  "author": "Edsger W. Dijkstra",
  "likes": 12
}
```

**NB** cuando estás comparando objetos, el método [deepStrictEqual](https://nodejs.org/api/assert.html#assertdeepstrictequalactual-expected-message) es probablemente lo que debas usar, [strictEqual](https://nodejs.org/api/assert.html#assertstrictequalactual-expected-message) intenta verificar que los dos valores sean el mismo valor, y no solo que contengan las mismas propiedades. Para conocer las diferencias entre las distintas funciones del módulo **assert**, puedes consultar [esta respuesta Stack Overflow](https://stackoverflow.com/questions/16745855/difference-between-equal-deep-equal-and-strict-equal/73937068#73937068).  
Escribe las pruebas para este ejercicio dentro de un nuevo bloque _describe_. Haz lo mismo con los ejercicios restantes también.

## 4.6\*: Funciones Auxiliares y Pruebas Unitarias, paso 4

Este y el siguiente ejercicio son un poco más desafiantes. No es necesario completar estos dos ejercicios para avanzar en el material del curso, por lo que puede ser una buena idea volver a estos una vez que haya terminado de leer el material de esta parte en su totalidad.  
Se puede terminar este ejercicio sin el uso de librerías adicionales. Sin embargo, este ejercicio es una gran oportunidad para aprender a usar la librería [Lodash](https://lodash.com/).  
Define una función llamada **mostBlogs** que reciba una lista de blogs como parámetro. La función devuelve el _author_ que tiene la mayor cantidad de blogs. El valor de retorno también contiene el número de blogs que tiene el autor principal:

```json
{
  "author": "Robert C. Martin",
  "blogs": 3
}
```

Si hay muchos blogueros importantes, entonces es suficiente con devolver uno de ellos.

## 4.7\*: Funciones Auxiliares y Pruebas Unitarias, paso 5

Define una función llamada **mostLikes** que reciba una lista de blogs como parámetro. La función devuelve el autor, cuyas publicaciones de blog tienen la mayor cantidad de me gusta. El valor de retorno también contiene el número total de likes que el autor ha recibido:

```json
{
  "author": "Edsger W. Dijkstra",
  "likes": 17
}
```

Si hay muchos bloggers importantes, entonces es suficiente para mostrar cualquiera de ellos.

# Ejercicios 4.8. - 4.12.

**Advertencia**: Si te encuentras utilizando los métodos async/await y _then_ en el mismo código, es casi seguro que estás haciendo algo mal. Usa uno u otro y no mezcles los dos.

## 4.8: Pruebas de Lista de Blogs, paso 1

Utiliza la librería SuperTest para escribir una prueba que realice una solicitud HTTP GET a la URL _/api/blogs_. Verifica que la aplicación de la lista de blogs devuelva la cantidad correcta de publicaciones de blog en formato JSON.  
Una vez finalizada la prueba, refactoriza el controlador de ruta para usar la sintaxis async/await en lugar de promesas.  
Ten en cuenta que tendrás que realizar cambios similares en el código a los que fueron hechos [en el material](https://fullstackopen.com/es/part4/probando_el_backend#entorno-de-prueba), como definir el entorno de prueba para que puedas escribir pruebas que usan una base de datos separada.  
**NB**: cuando estás escribiendo tus pruebas es **_mejor no ejecutarlas todas_**, solo ejecuta aquellas en las que estás trabajando. Lee más sobre esto [aquí](https://fullstackopen.com/es/part4/probando_el_backend#ejecucion-de-pruebas-una-por-una).

## 4.9: Pruebas de Lista de Blogs, paso 2

Escribe una prueba que verifique que la propiedad de identificador único de las publicaciones del blog se llame _id_, de manera predeterminada, la base de datos nombra la propiedad _id_.  
Realiza los cambios necesarios en el código para que pase la prueba. El método [toJSON](https://fullstackopen.com/es/part3/guardando_datos_en_mongo_db#backend-conectado-a-una-base-de-datos) discutido en la parte 3 es un lugar apropiado para definir el parámetro _id_.

## 4.10: Pruebas de Lista de Blogs, paso 3

Escribe una prueba que verifique que al realizar una solicitud HTTP POST a la URL _/api/blogs_ se crea correctamente una nueva publicación de blog. Como mínimo, verifica que el número total de blogs en el sistema se incrementa en uno. También puedes verificar que el contenido de la publicación del blog se guarde correctamente en la base de datos.  
Una vez finalizada la prueba, refactoriza la operación para usar async/await en lugar de promesas.

## 4.11\*: Pruebas de Lista de Blogs, paso 4

Escribe una prueba que verifique que si la propiedad _likes_ falta en la solicitud, tendrá el valor 0 por defecto. No pruebes las otras propiedades de los blogs creados todavía.  
Realiza los cambios necesarios en el código para que pase la prueba.

## 4.12\*: Pruebas de lista de blogs, paso 5

Escribe una prueba relacionada con la creación de blogs nuevos a través del endpoint _/api/blogs_, que verifique que si faltan las propiedades _title_ o _url_ de los datos solicitados, el backend responde a la solicitud con el código de estado _400 Bad Request_.  
Realiza los cambios necesarios en el código para que pase la prueba.

# Ejercicios 4.13. - 4.14.

## 4.13 Expansiones de la Lista de Blogs, paso 1

Implementa la funcionalidad para eliminar un solo recurso de publicación de blog.  
Utiliza la sintaxis async/await. Sigue las convenciones de [RESTful](https://fullstackopen.com/es/part3/node_js_y_express#rest) al definir la API HTTP.  
Implementa pruebas para esta funcionalidad.

## 4.14 Expansiones de Listas de Blogs, paso 2

Implementa la funcionalidad para actualizar la información de una publicación de blog individual.  
Utiliza async/await.  
La aplicación principalmente necesita actualizar la cantidad de _likes_ para una publicación de blog. Puedes implementar esta funcionalidad de la misma manera que implementamos actualizar notas en la [parte 3](https://fullstackopen.com/es/part3/guardando_datos_en_mongo_db#otras-operaciones).  
Implementa pruebas para esta funcionalidad.

# Ejercicios 4.15. - 4.23.

En los próximos ejercicios, se implementarán los conceptos básicos de la gestión de usuarios para la aplicación de lista de blogs. La forma más segura es seguir el material del curso desde el capítulo de la parte 4 [Administración de usuarios](https://fullstackopen.com/es/part4/administracion_de_usuarios) hasta el capítulo [Autenticación basada en token](https://fullstackopen.com/es/part4/autenticacion_basada_en_token). Por supuesto, también puedes utilizar tu creatividad.  
**Una advertencia más**: Si notas que estás mezclando llamadas async/await y _then_, es 99% seguro que estás haciendo algo mal. Utiliza uno u otro, nunca ambos.

## 4.15: Expansión de la Lista de Blogs, paso 3

Implementa una forma de crear nuevos usuarios realizando una solicitud POST HTTP a la dirección _api/users_. Los usuarios tienen _username, password y name_.  
No guardes las contraseñas en la base de datos como texto sin cifrar, utiliza la librería _bcrypt_ como hicimos en el capítulo de la parte 4 [Creando usuarios](https://fullstackopen.com/es/part4/administracion_de_usuarios#creando-usuarios).  
**NB** Algunos usuarios de Windows han tenido problemas con _bcrypt_. Si tienes problemas, elimina la librería con el comando

```bash
npm uninstall bcrypt
```

e instala [bcryptjs](https://www.npmjs.com/package/bcryptjs) en su lugar.  
Implementa una forma de ver los detalles de todos los usuarios realizando una solicitud HTTP adecuada.  
La lista de usuarios puede, por ejemplo, tener el siguiente aspecto:  
<img src="./imagenes/exp-lista-blogs-p3.png" alt="Expansión de la Lista de Blogs, paso 3"/>

## 4.16\*: Expansión de la Lista de Blogs, paso 4

Agrega una funcionalidad que agregue las siguientes restricciones para la creación de nuevos usuarios: Deben proporcionarse tanto el username como password y ambos deben tener al menos 3 caracteres. El username debe ser único.  
La operación debe responder con un código de estado adecuado y algún tipo de mensaje de error si se crea un usuario no válido.  
**NB** No pruebes las restricciones de password con las validaciones de Mongoose. No es una buena idea porque la password recibida por el backend y el hash de password guardado en la base de datos no son lo mismo. La longitud de la contraseña debe validarse en el controlador como hicimos en la [parte 3](https://fullstackopen.com/es/part3/validacion_y_es_lint) antes de usar la validación de Mongoose.  
Además, **implementa pruebas** que verifiquen que no se creen usuarios no válidos y que una operación de agregar usuario que sea no válida devuelva un código de estado adecuado y un mensaje de error.  
**NB** si decides definir pruebas en múltiples archivos, debes notar que por defecto cada archivo de prueba se ejecuta en su propio proceso (ver **Modelo de ejecución de pruebas** en la [documentación](https://nodejs.org/api/test.html#test-runner-execution-model)). La consecuencia de esto es que diferentes archivos de prueba se ejecutan al mismo tiempo. Dado que las pruebas comparten la misma base de datos, la ejecución simultánea puede causar problemas, que pueden evitarse ejecutando las pruebas con la opción **--test-concurrency=1**, es decir, definiéndolas para que se ejecuten secuencialmente.

## 4.17: Expansión de la Lista de Blogs, paso 5

Expande los blogs para que cada blog contenga información sobre el creador del blog.  
Modifica la adición de nuevos blogs para que cuando se cree un nuevo blog, _cualquier_ usuario de la base de datos sea designado como su creador (por ejemplo, el que se encontró primero). Implementa esto de acuerdo con el capítulo de la parte 4 [populate](https://fullstackopen.com/es/part4/administracion_de_usuarios#populate). El usuario designado como creador no importa todavía. La funcionalidad se termina en el ejercicio 4.19.  
Modifica la lista de todos los blogs para que la información de usuario del creador se muestre con el blog:  
<img src="./imagenes/exp-lista-blogs-p5.png" alt="Expansión de la Lista de Blogs, paso 5"/>  
y la lista de todos los usuarios también muestra los blogs creados por cada usuario:  
<img src="./imagenes/exp-lista-blogs-blogs-p5.png" alt="Expansión de la Lista de Blogs, blogs creados por c/usuario paso 5"/>

## 4.18: Expansión de la Lista de Blogs, paso 6

Implementar la autenticación basada en token según la parte 4 [Autenticación basada en token](https://fullstackopen.com/es/part4/autenticacion_basada_en_token).

## 4.19: Expansión de la Lista de Blogs, paso 7

Modifica la adición de nuevos blogs para que solo sea posible si se envía un token válido con la solicitud HTTP POST. El usuario identificado por el token se designa como el creador del blog.

## 4.20\*: Expansión de la Lista de Blogs, paso 8

[Este ejemplo](https://fullstackopen.com/es/part4/autenticacion_basada_en_token#limitacion-de-la-creacion-de-nuevas-notas-a-los-usuarios-registrados) de la parte 4 muestra cómo tomar el token del encabezado con la función auxiliar **getTokenFrom**.  
Si usaste la misma solución, refactoriza para llevar el token a un [middleware](https://fullstackopen.com/es/part3/node_js_y_express#middleware). El middleware debe tomar el token del encabezado _Authorization_ y debe asignarlo al campo _token_ del objeto _request_.  
En otras palabras, si registras este middleware en el archivo _app.js_ antes de todas las rutas

```plaintext
app.use(middleware.tokenExtractor)
```

Las rutas pueden acceder al token con **request.token**:

```javascript
blogsRouter.post("/", async (request, response) => {
  // ..
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  // ..
});
```

Recuerda que una [función middleware](https://fullstackopen.com/es/part3/node_js_y_express#middleware) es una función con tres parámetros, que al final llama al último parámetro _next_ para mover el control al siguiente middleware:

```javascript
const tokenExtractor = (request, response, next) => {
  // código que extrae el token

  next();
};
```

## 4.21\*: Expansión de la Lista de Blogs, paso 9

Cambia la operación de eliminar blogs para que el blog solo pueda ser eliminado por el usuario que lo agregó. Por lo tanto, eliminar un blog solo es posible si el token enviado con la solicitud es el mismo que el del creador del blog.  
Si se intenta eliminar un blog sin un token o por un usuario incorrecto, la operación debe devolver un código de estado adecuado.  
Ten en cuenta que si obtienes un blog de la base de datos,

```javascript
const blog = await Blog.findById(...)
```

el campo _blog.user_ no contiene una cadena, sino un objeto. Entonces, si deseas comparar el ID del objeto obtenido de la base de datos y un ID de cadena, la operación de comparación normal no funciona. El ID obtenido de la base de datos debe primero convertirse en una cadena.

```javascript
if ( blog.user.toString() === userid.toString() ) ...
```

## 4.22\*: Expansión de la Lista de Blogs, paso 10

Tanto la creación de un nuevo blog como su eliminación necesitan averiguar la identidad del usuario que está realizando la operación. El middleware **tokenExtractor** que hicimos en el ejercicio 4.20 ayuda, pero los controladores de las operaciones _post_ y _delete_ necesitan averiguar quién es el usuario que posee un token específico.  
Ahora cree un nuevo middleware **userExtractor**, que encuentre al usuario y lo guarde en el objeto de solicitud. Cuando registras el middleware en _app.js_

```plaintext
app.use(middleware.userExtractor)
```

el usuario se guardara en el campo request.user:

```javascript
blogsRouter.post("/", async (request, response) => {
  // obtén usuario desde el objeto de solicitud
  const user = request.user;
  // ..
});

blogsRouter.delete("/:id", async (request, response) => {
  // obtén usuario desde el objeto de solicitud
  const user = request.user;
  // ..
});
```

Ten en cuenta que es posible registrar un middleware solo para un conjunto específico de rutas. Entonces, en lugar de usar **userExtractor** con todas las rutas,

```javascript
const middleware = require("../utils/middleware");
// ...

// usa el middleware en todas las rutas

app.use(middleware.userExtractor);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
```

podríamos registrarlo para que solo se ejecute con las rutas de _/api/blogs_:

```javascript
const middleware = require("../utils/middleware");
// ...

// usa el middleware solo en las rutas de api/blogs

app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
```

Como puede verse, esto sucede al encadenarse múltiples middlewares como argumentos de la función _use_. También sería posible registrar un middleware solo para una operación específica:

```javascript
const middleware = require('../utils/middleware');
// ...

router.post('/', middleware.userExtractor, async (request, response) => {
  // ...
}
```

## 4.23\*: Expansión de la Lista de Blogs, paso 11

Después de agregar la autenticación basada en token, las pruebas para agregar un nuevo blog se rompieron. Arréglalas. También escribe una nueva prueba para asegurarte de que la adición de un blog falla con el código de estado adecuado _401 Unauthorized_ si no se proporciona un token.  
[Esto](https://github.com/forwardemail/supertest/issues/398) probablemente sea útil al hacer la corrección.
