const Header = (props) => {
  return (
    <div>
      <h1>Información del curso</h1>
      <h2>Nombre del curso:</h2>
      <p>{props.course}</p>
    </div>
  );
};

// Nuevo componente "Part".
const Part = (props) => {
  return (
    <p>
      {props.name}. Cantidad de ejercicios: {props.excercises}
    </p>
  );
};
const Content = (props) => {
  return (
    <div>
      <h2>Contenidos:</h2>
      <Part name={props.part1.name} excercises={props.part1.exercises} />
      <Part name={props.part2.name} excercises={props.part2.exercises} />
      <Part name={props.part3.name} excercises={props.part3.exercises} />
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
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };
  const totalEjercicios = part1.exercises + part2.exercises + part3.exercises;

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total totalEjercicios={totalEjercicios} />
    </div>
  );
};

export default App;
