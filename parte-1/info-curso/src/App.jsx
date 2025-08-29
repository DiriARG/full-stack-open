const Header = (props) => {
  return (
    <div>
      <h1>Información del curso</h1>
      <h2>Nombre del curso:</h2>
      <p>{props.course.name}</p>
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
      <Part name={props.parts[0].name} excercises={props.parts[0].exercises} />
      <Part name={props.parts[1].name} excercises={props.parts[1].exercises} />
      <Part name={props.parts[2].name} excercises={props.parts[2].exercises} />
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
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  const totalEjercicios =
    course.parts[0].exercises +
    course.parts[1].exercises +
    course.parts[2].exercises;
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total totalEjercicios={totalEjercicios} />
    </div>
  );
};

export default App;
