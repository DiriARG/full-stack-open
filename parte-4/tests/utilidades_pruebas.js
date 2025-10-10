// Archivo que contiene datos y funciones auxiliares para las pruebas.

const Blog = require("../models/blog");

const primerosBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

const blogsEnBd = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const blogValido = {
  title: "Blog de prueba :D",
  author: "Diri == Dirí",
  url: "https://op.gg/lol/summoners/las/Dir%C3%AD-23487",
  likes: 5,
};

module.exports = {
  primerosBlogs,
  blogsEnBd,
  blogValido,
};
