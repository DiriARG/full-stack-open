import axios from "axios";
import { useState, useEffect } from "react";
import type { Diario, Weather, Visibility } from "./tipos";
import { obtenerTodosLosDiarios, crearDiario } from "./servicios/diarios";

const App = () => {
  /* "useState<Diario[]>"" indica que este estado será siempre un array de objetos del tipo Diario.
  Esto permite que ts valide el uso de "diarios" y nos avise si intentamos acceder a propiedades inexistentes o guardar datos con una forma incorrecta. */
  const [diarios, setDiarios] = useState<Diario[]>([]);
  const [fecha, setFecha] = useState("");

  const [clima, setClima] = useState<Weather>("sunny");
  const [visibilidad, setVisibilidad] = useState<Visibility>("great");
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

      // Reseteamos los campos. Clima y visibilidad por defecto vuelven a "sunny" y "great" correspondientemente.
      setFecha("");
      setClima("sunny");
      setVisibilidad("great");
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
            type="date"
            value={fecha}
            onChange={(evento) => setFecha(evento.target.value)}
          />
        </div>

        <div>
          Visibilidad
          {/* Se define explicitamente el array de valores: ["great", "good", "ok", "poor"]. 
          "as Visibility[]" le asegura a ts (Type Assertion) que este array de strings de texto coincide exactamente con el tipo "Visibility" definido en "tipos.ts".
          Se utiliza map para generar un bloque de código JSX por cada valor en el array. 
          Atributos del input:
          - "name": agrupa los radio buttons que contengan el mismo "name". 
          - "value": El valor de este input es el string actual (great, good, etc).
          - "checked": Si el valor actual del estado (visibilidad) es igual al valor de este input (valor), entonces el botón se marca como seleccionado. Esto hace que el input esté "controlado" por React. */}
          {(["great", "good", "ok", "poor"] as Visibility[]).map((valor) => (
            <label key={valor}>
              <input
                type="radio"
                value={valor}
                checked={visibilidad === valor}
                onChange={() => setVisibilidad(valor)}
              />
              {/* Muestra el texto del radio button, osea directamente el valor (great, good, etc). */}
              {valor}
            </label>
          ))}
        </div>

        <div>
          Clima
          {(["sunny", "rainy", "cloudy", "stormy", "windy"] as Weather[]).map(
            (valor) => (
              <label key={valor}>
                <input
                  type="radio"
                  name="clima"
                  value={valor}
                  checked={clima === valor}
                  onChange={() => setClima(valor)}
                />
                {valor}
              </label>
            )
          )}
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
