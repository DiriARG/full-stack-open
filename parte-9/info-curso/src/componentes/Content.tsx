import type { PartesDelCurso } from "../tipos";

interface ContentProp {
  partes: PartesDelCurso[];
}

const Content = ({ partes }: ContentProp) => {
  return (
    <div>
      {partes.map((parte) => (
        <p key={parte.name}>
          {parte.name} {parte.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;