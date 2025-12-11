// Función que calcula el índice de masa corporal (IMC).
const calculateBmi = (alturaCm: number, pesoKg: number): string => {
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

console.log(calculateBmi(180, 74)); 
