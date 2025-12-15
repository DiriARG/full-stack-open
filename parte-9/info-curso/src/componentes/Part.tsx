import type { CoursePart } from "../tipos";

interface parteProp {
  parte: CoursePart;
}

/* Función de ayuda para la comprobación exhaustiva de tipos de uniones discriminadas.
Esta función asegura en tiempo de compilación que todos los casos de una unión han sido manejados en un bloque switch.
El tipo "never" representa un conjunto de valores que nunca puede ocurrir. */
const verificarExhaustividad = (valor: never): never => {
  /* "valor" debe ser de tipo "never". Si al llamar la función, el compilador de TypeScript determina que "valor" tiene un tipo restante (no manejado),
  lanzará un error de compilación que incluye el valor no manejado. */
  throw new Error(
    `Miembro de unión discriminada no manejado: ${JSON.stringify(valor)}`
  );
};

const Part = ({ parte }: parteProp) => {
  switch (parte.kind) {
    case "basic":
      return (
        <div>
          <b>
            {parte.name} {parte.exerciseCount}
          </b>
          <p>
            <i>{parte.description}</i>
          </p>
        </div>
      );

    case "group":
      return (
        <div>
          <b>
            {parte.name} {parte.exerciseCount}
          </b>
          <p>Ejercicios del proyecto: {parte.groupProjectCount}</p>
        </div>
      );

    case "background":
      return (
        <div>
          <b>
            {parte.name} {parte.exerciseCount}
          </b>
          <p>
            <i>{parte.description}</i>
          </p>
          <p>Subir a {parte.backgroundMaterial}</p>
        </div>
      );

    case "special":
      return (
        <div>
          <b>
            {parte.name} {parte.exerciseCount}
          </b>
          <p>
            <i>{parte.description}</i>
          </p>
          <p>Habilidades requeridas: {parte.requirements.join(", ")}</p>
        </div>
      );

    default:
      // Si llega al default es porque se agregó un nuevo tipo de parte del curso a la unión "CoursePart" pero no se agregó el caso correspondiente en este switch.
      return verificarExhaustividad(parte);
  }
};

export default Part;
