interface ResultadoDelEjercicio {
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

const calculateExercises = (
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
  else if (promedio >= objetivo * 0.80) {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
