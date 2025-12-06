import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../consultas";
import { useApolloClient } from "@apollo/client";


const FormularioLogin = ({ show, setToken, setPage }) => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensajeError, setMensajeError] = useState(null);
  const cliente = useApolloClient();

  const [login] = useMutation(LOGIN, {
    // Maneja los errores enviados por el backend.
    onError: (error) => {
      setMensajeError(error.graphQLErrors[0]?.message || "Error en login");
    },
    // En caso de que la mutación se completa exitosamente.
    onCompleted: (data) => {
      // Se obtiene el token del back.
      const token = data.login.value;
      // Se guarda en localStorage para mantener la sesión.
      localStorage.setItem("usuarioLogueado", token);
      // Se actualiza el estado global de la app con el token, disparando un re-renderizado en App.jsx para mostrar la UI de usuario atenticado.
      setToken(token);
      // Se resetea la caché inmediatamente después del login.
      cliente.resetStore()
      // Se redirige al usuario.
      setPage("authors");

      setUsuario("");
      setContraseña("");
      setMensajeError("");
    },
  });

  if (!show) {
    return null;
  }

  const enviar = async (evento) => {
    evento.preventDefault();

    // Se ejecuta la mutación enviando los valores del formulario, se mapea los nombres ya que en el esquema login espera username y password.
    login({
      variables: { username: usuario, password: contraseña },
    });
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>

      {mensajeError && <p style={{ color: "red" }}>{mensajeError}</p>}

      <form onSubmit={enviar}>
        <div>
          Nombre:
          <input
            value={usuario}
            onChange={(evento) => setUsuario(evento.target.value)}
          />
        </div>

        <div>
          Contraseña:
          <input
            type="password"
            value={contraseña}
            onChange={(evento) => setContraseña(evento.target.value)}
          />
        </div>

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default FormularioLogin;
