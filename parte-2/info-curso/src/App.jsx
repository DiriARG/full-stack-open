const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((parte) => (
      <Part key={parte.id} part={parte} />
    ))}
  </div>
);

// Nuevo componente "Course", recibe data y la pasa a otros componentes.
const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

const Total = ({ parts }) => {
  // Se utiliza "reduce" ya que es más directo al devolvernos un único valor.
  const total = parts.reduce((suma, part) => suma + part.exercises, 0);
  return <p>Cantidad de ejercicios: {total}</p>;
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
