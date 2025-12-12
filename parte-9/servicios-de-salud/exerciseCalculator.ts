export interface ResultadoDelEjercicio {
  // Número total de días analizados.
  periodoLongitud: number;
  diasEntrenamiento: number;
  exito: boolean;
  calificacion: 1 | 2 | 3;
  descripcionCalificacion: string;
  // Objetivo diario inicial.
  objetivo: number;
  // Horas promedio de ejercicio.
  promedio: number;
}

interface ValoresEjercicio {
  objetivo: number;
  horas: number[];
}

const analizarArgumentosEjercicio = (args: string[]): ValoresEjercicio => {
  if (args.length < 4) {
    throw new Error(
      "Debes ingresar el valor objetivo seguido de los registros de horas de ejercicio"
    );
  }

  const objetivo = Number(args[2]);
  if (isNaN(objetivo)) throw new Error("El objetivo debe ser un número");

  // Crea un nuevo array omitiendo los primeros 3 elementos (node, exerciseCalculator.ts, objetivo) y convierte cada string en un número.
  const horas = args.slice(3).map(Number);
  // Verifica si "al menos uno" de los elementos del nuevo array (gracias a "some") es NaN (no es un número).
  if (horas.some((hora) => isNaN(hora))) {
    throw new Error("Todas las horas diarias deben ser números");
  }

  return { objetivo, horas };
};

export const calculateExercises = (
  horasDiarias: number[],
  objetivo: number
): ResultadoDelEjercicio => {
  const periodoLongitud = horasDiarias.length;
  // Cuantos días fueron de entrenamiento efectivo, osea más de 1 hora de ejercicio.
  const diasEntrenamiento = horasDiarias.filter((hora) => hora > 0).length;

  const sumaTotalHoras = horasDiarias.reduce((suma, hora) => suma + hora, 0);
  const promedio = sumaTotalHoras / periodoLongitud;

  const exito = promedio >= objetivo;

  let calificacion: 1 | 2 | 3;
  let descripcionCalificacion: string;

  // Calificación 3: Máximo rendimiento.
  if (promedio >= objetivo) {
    calificacion = 3;
    descripcionCalificacion =
      "¡Excelente! Alcanzaste tu objetivo de promedio diario";
  }
  // Calificación 2: Entre el 80% y el 99.9...%.
  else if (promedio >= objetivo * 0.8) {
    calificacion = 2;
    descripcionCalificacion =
      "Muy bien!!!, te falta muy poco para poder alcanzar la meta completa";
  } else {
    calificacion = 1;
    descripcionCalificacion =
      "Necesitas trabajar más. Esforzate por superar el 80% del objetivo";
  }

  // Se devuelve el objeto con todas las propiedades calculadas.
  return {
    periodoLongitud,
    diasEntrenamiento,
    exito,
    calificacion,
    descripcionCalificacion,
    objetivo,
    promedio,
  };
};

if (require.main === module) {
  try {
    const { objetivo, horas } = analizarArgumentosEjercicio(process.argv);
    console.log(calculateExercises(horas, objetivo));
  } catch (error: unknown) {
    let mensaje = "Ocurrió un error.";
    if (error instanceof Error) {
      mensaje += " Detalles: " + error.message;
    }
    console.error(mensaje);
  }
}
