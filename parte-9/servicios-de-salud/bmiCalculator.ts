interface ValoresIMC {
  altura: number;
  peso: number;
}

/* Función que analiza y valida los argumentos de línea de comando para el cálculo del IMC.
Se utiliza "process.argv", que incluye la ruta de node (0), la ruta del archivo que se está ejecutando (1) y los argumentos que el usuario realmente pasa (ej, la altura, el peso) --> 2. */
const analizarArgumentosIMC = (args: string[]): ValoresIMC => {
  // Acá se verifica la cantidad de argumentos, se espera exactamente 4: node, bmiCalculator.ts, altura, peso.
  if (args.length < 4) throw new Error("No hay suficientes argumentos");
  if (args.length > 4) throw new Error("Demasiados argumentos");

  // Se convierten los argumentos a números.
  const altura = Number(args[2]);
  const peso = Number(args[3]);

  // Verificación que ambos valores sean números válidos después de la conversión con la función "isNan(valor)" (¿Este valor no es un número?).
  if (isNaN(altura) || isNaN(peso)) {
    throw new Error("Los valores ingresados deben ser números");
  }

  return { altura, peso };
};

// Función que calcula el índice de masa corporal (IMC).
export const calculateBmi = (alturaCm: number, pesoKg: number): string => {
  // Se convierte la altura de centímetros a metros.
  const alturaM = alturaCm / 100;

  // Fórmula del IMC: peso (kg) / altura (m)^2.
  const imc = pesoKg / (alturaM * alturaM);

  if (imc < 18.5) {
    return "Bajo peso";
  } else if (imc < 25) {
    return "Normal (peso saludable)";
  } else if (imc < 30) {
    return "Sobrepeso";
  } else {
    return "Obesidad";
  }
};


// Este if sirve para evitar que Express ejecute este código e intente leer argumentos de la terminal que no existen. Este bloque solo se ejecuta cuando se ejecuta este archivo directamente.
if (require.main === module) {
  try {
    // Analiza los argumentos de línea de comando y los extrae si son válidos.
    const { altura, peso } = analizarArgumentosIMC(process.argv);
    // Se pasan los valores (argumentos) a la función de imc para que ejecute el cálculo y muestre el resultado en consola.
    console.log(calculateBmi(altura, peso));
  } catch (error: unknown) {
    // Valor por defecto del parámetro error en el catch es unknown, más seguro que "any" ya que obliga a validar el tipo.
    let mensaje = "Ocurrió un error.";
    // Guardia de tipo (Type guard): Verifica si el objeto es una instancia de la clase "Error" para acceder a sus propiedades.
    if (error instanceof Error) {
      // Si es así, ts permite acceder de forma segura a ".message".
      mensaje += " Detalles: " + error.message;
    }
    console.error(mensaje);
  }
}

