// Archivo que contiene funciones auxiliares para trabajar con listas de blogs.
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  // "reduce" realiza una suma acumulada, reduciendo el array a un solo valor, sumando los "likes" de cada "blog".
  return blogs.reduce((suma, blog) => suma + blog.likes, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
