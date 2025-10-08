const blog = require("../models/blog");

// Archivo que contiene funciones auxiliares para trabajar con listas de blogs.
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
