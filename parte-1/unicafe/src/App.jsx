import { useState } from "react";

// Nuevo componente que contiene las estadísticas.
const Statistics = ({ good, neutral, bad, total, promedio, positivo }) => {
  if (total === 0) {
    return <p>No hay estadísticas disponibles todavía.</p>;
  } else {
    return (
      <div>
        <h2>Estadísticas</h2>
        <StatisticLine texto="Bueno" valor={good} />
        <StatisticLine texto="Neutral" valor={neutral} />
        <StatisticLine texto="Malo" valor={bad} />
        <StatisticLine texto="Total" valor={total} />
        <StatisticLine texto="Promedio" valor={promedio} />
        <StatisticLine texto="Positivos" valor={`${positivo}%`} />
      </div>
    );
  }
};

// Componente "Button" para definir los botones utilizados para enviar comentarios.
const Button = ({ handleClick, opinion }) => (
  <button onClick={handleClick}> {opinion}</button>
);

// Componente "StatisticLine" para mostrar una única estadística, por ejemplo, la puntuación media.
const StatisticLine = ({ texto, valor }) => (
  <p>
    {texto}: {valor}
  </p>
);

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  // good +1 (voto positivo), neutral 0 (voto neutro) y bad -1 (voto negativo).
  const promedio =
    total === 0 ? 0 : ((good * 1 + neutral * 0 + bad * -1) / total).toFixed(1); // Utilizamos condición ternaria, Si... si no...
  const positivo = total === 0 ? 0 : ((good / total) * 100).toFixed(1); // "toFixed(1)"" lo redonde a 1 decimal.

  return (
    <div>
      <h1>¿Qué te pareció nuestros productos/servicios?</h1>
      <Button handleClick={() => setGood(good + 1)} opinion="Bueno" />
      <Button handleClick={() => setNeutral(neutral + 1)} opinion="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} opinion="Malo" />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        promedio={promedio}
        positivo={positivo}
      />
    </div>
  );
};

export default App;
