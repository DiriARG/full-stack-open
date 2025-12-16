import { useState, useEffect } from "react";
import type { Diario } from "./tipos";
import { obtenerTodosLosDiarios } from "./servicios/diarios";

const App = () => {
  /* "useState<Diario[]>"" indica que este estado será siempre un array de objetos del tipo Diario.
  Esto permite que ts valide el uso de "diarios" y nos avise si intentamos acceder a propiedades inexistentes o guardar datos con una forma incorrecta. */
  const [diarios, setDiarios] = useState<Diario[]>([]);

  useEffect(() => {
    obtenerTodosLosDiarios().then((data) => {
      setDiarios(data);
    });
  }, []);

  return (
    <div>
      <h2>Diary entries</h2>

      {diarios.map((diario) => (
        <div key={diario.id}>
          <h3>{diario.date}</h3>
          <p>visibility: {diario.visibility}</p>
          <p>weather: {diario.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
