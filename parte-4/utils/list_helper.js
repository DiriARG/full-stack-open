// Archivo que contiene funciones auxiliares para trabajar con listas de blogs.
// Importamos la libreria "Lodash".
const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  // "reduce" realiza una suma acumulada, reduciendo el array a un solo valor, sumando los "likes" de cada "blog".
  return blogs.reduce((suma, blog) => suma + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  // Verificación en caso de que la lista esté vacia para evitar errores.
  if (blogs.length === 0) {
    return null; // Se devuelve null porque la función tiene objetivo devolver un objeto ({ title, author, url, likes }); "null" muestra la ausencia de ese objeto esperado.
  }

  // "max" es el acumulador, el blog que tiene el máximo número de likes. "blog" es el elemento actual que se está analizando.
  const blogMasLikeado = blogs.reduce((max, blog) =>
    // Acá devuelve el blog con más likes de los dos (el acumulador "max" o el "blog" actual).
    blog.likes > max.likes ? blog : max
  );

  // Se devuelve el objeto con solo las propiedades que necesitamos.
  return {
    title: blogMasLikeado.title,
    author: blogMasLikeado.author,
    likes: blogMasLikeado.likes,
  };
};

// Función que devuelve el autor con más blogs (utilizando Lodash).
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  /* Se agrupa la lista de blogs en un objeto donde las claves son los nombres de los autores,
  y los valores son arrays con los blogs de cada uno, osea:
  {
    "Michael Chan": [blog1],
    "Edsger W. Dijkstra": [blog2, blog3],
    ...
  }
  */
  const agrupacion = _.groupBy(blogs, "author");

  /* Acá se transforma el objeto agrupado a un array de objetos con el formato final desado ej:
  [
    { author: "Michael Chan", blogs: 1 },
    { author: "Edsger W. Dijkstra", blogs: 2 },
    ...
  ]
  */
  const conteoAutores = _.map(agrupacion, (blogsDelAutor, nombreAutor) => ({
    author: nombreAutor,
    blogs: blogsDelAutor.length,
  }));

  // Devuelve el autor con la cantidad máxima de blogs (mayor valor en la propiedad "blogs").
  return _.maxBy(conteoAutores, "blogs");
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
