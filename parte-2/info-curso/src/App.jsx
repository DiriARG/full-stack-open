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
  return <p><strong>Cantidad de ejercicios: {total}</strong></p>;
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      {courses.map((curso) => ( // Utilizamos "map()" para recorrer todos los cursos.
        <Course key={curso.id} course={curso} />
      ))}
    </div>
  );
};

export default App;
