import Header from "./componentes/Header";
import Content from "./componentes/Content";
import Total from "./componentes/Total";
import type { PartesDelCurso } from "./tipos";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: PartesDelCurso[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header nombre={courseName} />
      <Content partes={courseParts} />
      <Total partes={courseParts} />
    </div>
  );
};

export default App;