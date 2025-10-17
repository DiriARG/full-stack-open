import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import servicioLogin from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [mensajeDeError, setMensajeDeError] = useState(null);
  const [nombreDeUsuario, setNombreDeUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // La aplicación verifica si los detalles de un usuario que ha iniciado sesión ya se encuentran en el local storage.
  useEffect(() => {
    const usuarioLogueadoJSON = window.localStorage.getItem(
      "usuarioBlogListLogueado"
    );
    // Si se encuentran ahi...
    if (usuarioLogueadoJSON) {
      const usuario = JSON.parse(usuarioLogueadoJSON);
      // Los detalles se guardan en el estado de la aplicación.
      setUsuario(usuario);
    }
  }, []);

  // Maneja el envío del formulario de inicio de sesión.
  const handleLogin = async (evento) => {
    evento.preventDefault();
    try {
      const usuario = await servicioLogin.login({
        // El post del login en el backend espera las variables username y password (parte 4), por lo tanto se los renombra.
        username: nombreDeUsuario,
        password: contraseña,
      });

      // Se guarda los datos del usuario en localStorage.
      window.localStorage.setItem(
        "usuarioBlogListLogueado",
        JSON.stringify(usuario)
      );

      // Se guardan los datos del usuario y su token.
      setUsuario(usuario);

      setNombreDeUsuario("");
      setContraseña("");
    } catch {
      setMensajeDeError("Credenciales incorrectas");
      setTimeout(() => {
        setMensajeDeError(null);
      }, 5000);
    }
  };

  const handleCerrarSesion = () => {
    window.localStorage.removeItem("usuarioBlogListLogueado");
    // Se renderiza el componente y ahora toma un valor usuario=== null, por lo tanto se muestra nuevamente el formulario de login.
    setUsuario(null);
  };

  const formularioLogin = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          Nombre de usuario
          <input
            type="text"
            value={nombreDeUsuario}
            onChange={({ target }) => setNombreDeUsuario(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Contraseña
          <input
            type="password"
            value={contraseña}
            onChange={({ target }) => setContraseña(target.value)}
          />
        </label>
      </div>
      <button type="submit">Ingresá</button>
    </form>
  );

  // Si el usuario es null (no inició sesión), se renderiza el formulario.
  if (usuario === null) {
    return (
      <div>
        <h2>Inicie sesión en la aplicación</h2>
        {formularioLogin()}
      </div>
    );
  }

  // Si el usuario no es null (inicia sesión), se muestra el nombre del usuario y una lista de blogs.
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {usuario.name} inició sesión
        <button onClick={handleCerrarSesion}>Salir</button>
      </p>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
