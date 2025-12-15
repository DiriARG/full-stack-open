import type { PartesDelCurso } from "../tipos";

interface TotalProp {
    partes: PartesDelCurso[];
}

const Total = ({ partes }: TotalProp) => {
  const totalExercises = partes.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return <p>Number of exercises {totalExercises}</p>;
};

export default Total;