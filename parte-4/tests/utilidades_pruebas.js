// Archivo que contiene datos y funciones auxiliares para las pruebas.
const Blog = require("../models/blog");
const Usuario = require("../models/usuario");

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

const usuariosEnBd = async () => {
  const usuarios = await Usuario.find({});
  return usuarios.map((usuario) => usuario.toJSON());
};

// Se usa para poblar la bd antes de las pruebas, teniendo un usario ya existente.
const usuarioInicial = {
  username: "usuarioInicial",
  name: "Matías Di Risio",
  passwordHash: "hashDeEjemplo123",
};

const nuevoUsuario = {
  username: "nuevoUsuario",
  name: "Carlos",
  password: "secreto123",
};

// Objeto que contiene casos inválidos de creación.
const usuariosInvalidos = {
  sinPassword: { username: "sinpass", name: "Test1" },
  sinUsername: { name: "Test2", password: "abc123" },
  cortoUsername: { username: "ab", name: "CortoU", password: "valido123" },
  cortoPassword: { username: "validouser", name: "CortoP", password: "12" },
  duplicado: {
    username: "usuarioInicial",
    name: "Duplicado",
    password: "otra123",
  },
};

module.exports = {
  primerosBlogs,
  blogsEnBd,
  blogValido,
  usuariosEnBd,
  usuarioInicial,
  nuevoUsuario,
  usuariosInvalidos,
};
