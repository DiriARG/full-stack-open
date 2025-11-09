import deepFreeze from "deep-freeze";
import { describe, expect, test } from "vitest";
import counterReducer from "./counterReducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test("should return a proper initial state when called with undefined state", () => {
    const action = {
      type: "DO_NOTHING",
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("good is incremented", () => {
    const action = {
      type: "GOOD",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });

  test("incrementa el campo 'ok'", () => {
    const accion = {
      type: "OK",
    };
    const estado = initialState;

    // "deepFreeze" asegura la inmutabilidad del estado.
    deepFreeze(estado); 
    // "counterReducer" agarra el estado (inmutable) y la acción; Calcula y retorna el nuevo estado, en este caso, donde el campo 'ok' se incrementa en +1 según la lógica del switch case: "OK". 
    const nuevoEstado = counterReducer(estado, accion);
    expect(nuevoEstado).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });

  test("incrementa el campo 'bad'", () => {
    const accion = {
      type: "BAD",
    };
    const estado = initialState;

    deepFreeze(estado);
    const nuevoEstado = counterReducer(estado, accion);
    expect(nuevoEstado).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  });

  test("el estado se resetea con 'reset'", () => {
    const accion = {
      type: "RESET",
    };
    // Se define un nuevo estado con valores diferentes a 0.
    const estado = {
      good: 5,
      ok: 4,
      bad: 2,
    };

    deepFreeze(estado);
    const nuevoEstado = counterReducer(estado, accion);
    // El nuevo estado debe ser igual al initialState (todos en 0).
    expect(nuevoEstado).toEqual(initialState);
  });
});
