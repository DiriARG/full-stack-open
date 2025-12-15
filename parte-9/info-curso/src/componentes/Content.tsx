import type { CoursePart } from "../tipos";
import Part from "./Part";

interface ContentProp {
  partes: CoursePart[];
}

const Content = ({ partes }: ContentProp) => {
  return (
    <div>
      {partes.map((parte) => (
        // parte={parte}: se pasa una parte del curso (CoursePart) al componente "Part", que luego usa "parte.kind" para decidir qué mostrar.
        <Part key={parte.name} parte={parte} />
      ))}
    </div>
  );
};

export default Content;
