const Header = (props) => {
  return (
    <div>
      <h1>Información del curso</h1>
      <h2>Nombre del curso:</h2>
      <p>{props.course}</p>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <h2>Contenidos:</h2>
      <p>
        Parte 1: {props.part1}. Cantidad de ejercicios: {props.exercises1}
      </p>
      <p>
        Parte 2: {props.part2}. Cantidad de ejercicios: {props.exercises2}
      </p>
      <p>
        Parte 3: {props.part3}. Cantidad de ejercicios: {props.exercises3}
      </p>
    </div>
  );
};
const Total = (props) => {
  return (
    <div>
      <p>Número total de ejercicios: {props.totalEjercicios}</p>
    </div>
  );
};
const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;
  const totalEjercicios = exercises1 + exercises2 + exercises3;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />
      <Total totalEjercicios={totalEjercicios} />
    </div>
  );
};

export default App;
