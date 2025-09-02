import { useState } from "react";

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

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
    </div>
  );
};

export default App;
