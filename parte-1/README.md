# Ejercicios 1.1. - 1.2.

## 1.1: Información del Curso, paso 1

_La aplicación en la que comenzaremos a trabajar en este ejercicio se continuara desarrollando en algunos de los siguientes ejercicios. En este y otros conjuntos de ejercicios futuros de este curso, es suficiente enviar solo el estado final de la aplicación. Si lo deseas, también puedes crear un commit para cada ejercicio de la serie, pero esto es completamente opcional._  
Usa Vite para inicializar una nueva aplicación. Modifica _main.jsx_ para que coincida con lo siguiente

```jsx
import ReactDOM from "react-dom/client";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

y _App.jsx_ para que coincida con lo siguiente

```jsx
const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <h1>{course}</h1>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  );
};

export default App;
```

y elimina los archivos adicionales App.css, e index.css, también elimina el directorio assets.

Desafortunadamente, toda la aplicación está en el mismo componente. Refactoriza el código para que conste de tres componentes nuevos: _Header, Content y Total_. Todos los datos aún residen en el componente _App_, que pasa los datos necesarios a cada componente mediante _props_. _Header_ se encarga de mostrar el nombre del curso, _Content_ muestra las partes y su número de ejercicios y _Total_ muestra el número total de ejercicios.

Define los nuevos componentes en el archivo _App.jsx_.

El cuerpo del componente _App_ será aproximadamente como el siguiente:

```jsx
const App = () => {
  // const-definitions

  return (
    <div>
      <Header course={course} />
      <Content ... />
      <Total ... />
    </div>
  )
}
```

**ADVERTENCIA** No trates de programar todos los componentes de corrido, porque esto podría ciertamente romper toda la aplicación. Procede en pequeños pasos, primero haz por ejemplo: el componente _Header_ y solo cuando confirmes que funciona, podrás continuar con el siguiente componente.

El progreso cuidadoso y en pequeños pasos puede parecer lento, pero en realidad es con _diferencia la forma más rápida_ de progresar. El famoso desarrollador de software Robert "Uncle Bob" Martin ha declarado

_"La única manera de ir rápido, es hacerlo bien"_

es decir, según Martin, avanzar con cuidado y con pequeños pasos es incluso la única manera de ser rápido.

## 1.2: Información del Curso, paso 2

Refactoriza el componente _Content_ para que no muestre ningún nombre de partes o su número de ejercicios por sí mismo. En su lugar, solo representa tres componentes _Part_ de los cuales cada uno representa el nombre y el número de ejercicios de una parte.

```jsx
const Content = ... {
  return (
    <div>
      <Part .../>
      <Part .../>
      <Part .../>
    </div>
  )
}
```

Nuestra aplicación pasa información de una manera bastante primitiva en este momento, ya que se basa en variables individuales.
Esta situación mejorará pronto en la [parte 2](https://fullstackopen.com/es/part2), pero antes de eso, vamos a la parte 1b para aprender acerca de JavaScript.
