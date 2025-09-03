import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  //"new Array(anecdotes.length)" crea un array vacío con 8 posiciones, "fill(0), rellena las posiciones con 0".
  const [votos, setVotos] = useState(new Array(anecdotes.length).fill(0))

  
  // Controlador de evento para cambiar a una anécdota aleatoria.
  const handleClick = () => {
    // Elije el número de una anécdota aleatoria.
    const numeroAleatorio = Math.floor(Math.random() * anecdotes.length);
    setSelected(numeroAleatorio);
  };
  

  const handleVoto = () => {
    // Crea un copia del array de votos.
    const copiaArray = [...votos];
    // Incrementa el voto en el índice de la anécdota seleccionada. 
    copiaArray[selected] += 1;
    // Actualiza el estado con la nueva copia del array de votos.
    setVotos(copiaArray);
  }
  
  return (
    <div>
      <p> {anecdotes[selected]} </p>
      <p>Esta anécdota tiene {votos[selected]}</p>
      <button onClick={handleVoto}>Votar</button>
      <button onClick={handleClick}>Siguiente anécdota</button>
      
    </div>
  );
};

export default App;
