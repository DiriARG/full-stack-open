import axios from "axios";
import { useState, useEffect } from "react";
import type { Diario } from "./tipos";
import { obtenerTodosLosDiarios, crearDiario } from "./servicios/diarios";

const App = () => {
  /* "useState<Diario[]>"" indica que este estado será siempre un array de objetos del tipo Diario.
  Esto permite que ts valide el uso de "diarios" y nos avise si intentamos acceder a propiedades inexistentes o guardar datos con una forma incorrecta. */
  const [diarios, setDiarios] = useState<Diario[]>([]);
  const [fecha, setFecha] = useState("");
  const [clima, setClima] = useState("");
  const [visibilidad, setVisibilidad] = useState("");
  const [comentario, setComentario] = useState("");
  // El estado espera un string (cuando hay error --> debe mostrar txt), o un null (no hay error).
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerTodosLosDiarios().then((data) => {
      setDiarios(data);
    });
  }, []);

  /* En React no se usan directamente los eventos nativos del navegador. Por lo tanto, React crea una capa intermedia llamada "SyntheticEvent" (envuelve los eventos del navegador). 
     Esto normaliza el comportamiento entre navegadores. 
     En React/JS se hacía: (evento) => evento.preventDefault().
     En TS + React: (evento: React.SyntheticEvent) => evento.preventDefault(). 
  */
  const creacionDeDiario = async (evento: React.SyntheticEvent) => {
    evento.preventDefault();

    try {
      const diarioCreado = await crearDiario({
        // Se mapean ("Data Mapping") los estados en español a los nombres que espera el backend.
        date: fecha,
        weather: clima,
        visibility: visibilidad,
        comment: comentario,
      });

      // Se lo agrega al estado sin mutar al array original.
      setDiarios(diarios.concat(diarioCreado));

      setFecha("");
      setClima("");
      setVisibilidad("");
      setComentario("");
    } catch (error: unknown) {
      // "isAxiosError" es un "typeguard" provisto por Axios. A partir de acá, ts sabe que "error" es un AxiosError y habilita el acceso seguro a propiedades como "error.response", "error.request", etc.
      if (axios.isAxiosError(error)) {
        // Si el backend respondió con un error y el cuerpo del error es un string...
        if (error.response && typeof error.response.data === "string") {
          // Se lo muestra al usuario.
          setError(error.response.data);
        } else {
          setError("Error desconocido al crear el diario");
        }
      }
      // Si el error no viene de axios...
      else {
        setError("Error inesperado");
      }

      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Añadir nueva entrada</h2>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <form onSubmit={creacionDeDiario}>
        <div>
          Fecha
          <input
            value={fecha}
            onChange={(evento) => setFecha(evento.target.value)}
          />
        </div>

        <div>
          Visibilidad
          <input
            value={visibilidad}
            onChange={(evento) => setVisibilidad(evento.target.value)}
          />
        </div>

        <div>
          Clima
          <input
            value={clima}
            onChange={(evento) => setClima(evento.target.value)}
          />
        </div>

        <div>
          Comentario
          <input
            value={comentario}
            onChange={(evento) => setComentario(evento.target.value)}
          />
        </div>

        <button type="submit">Agregar</button>
      </form>
      <h2>Apuntes de diarios</h2>

      {diarios.map((diario) => (
        <div key={diario.id}>
          <h3>{diario.date}</h3>
          <p>Visibilidad: {diario.visibility}</p>
          <p>Clima: {diario.weather}</p>
          <p>Comentario: {diario.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
