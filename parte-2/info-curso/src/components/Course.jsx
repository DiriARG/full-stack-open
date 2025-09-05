const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((parte) => (
      <Part key={parte.id} part={parte} />
    ))}
  </>
);

const Total = ({ parts }) => {
  // Se utiliza "reduce" ya que es más directo al devolvernos un único valor.
  const total = parts.reduce((suma, part) => suma + part.exercises, 0);
  return (
    <p>
      <strong>Cantidad de ejercicios: {total}</strong>
    </p>
  );
};

// Nuevo componente "Course", recibe data y la pasa a otros componentes.
const Course = ({ course }) => (
  <> 
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
);

// Se exporta solo "Course", porque los demás componentes no se usan fuera de este módulo.
export default Course;
