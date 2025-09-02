import { useState } from "react";

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  // good +1 (voto positivo), neutral 0 (voto neutro) y bad -1 (voto negativo).
  const promedio =
    total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / total; // Utilizamos condición ternaria, Si... si no...
  const positivo = total === 0 ? 0 : ((good / total) * 100).toFixed(1); // "toFixed(1)"" lo redonde a 1 decimal.

  return (
    <div>
      <h1>¿Qué te pareció nuestros productos/servicios?</h1>
      <button onClick={() => setGood(good + 1)}>Bueno</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Malo</button>
      <h2>Estadísticas</h2>
      <p>Bueno: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Malo: {bad}</p>
      <p>Total: {total} </p>
      <p>Promedio: {promedio}</p>
      <p>Positivos: {positivo} %</p>
    </div>
  );
};

export default App;
