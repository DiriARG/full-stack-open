import express from "express";
import servicioPaciente from "../servicios/servicioPaciente";
import { construirNuevoPaciente } from "../utilidades";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(servicioPaciente.obtenerPacientes());
});

router.post("/", (req, res) => {
  try {
    // Acá se valida para asegurar que lo que ingresa en req.body cumple con el esquema de "NuevoPaciente".
    const nuevoPaciente = construirNuevoPaciente(req.body);
    // Si la validación fue exitosa, se agrega al paciente a través del servicio asignandole un id y guardandolo.
    const pacienteAgregado = servicioPaciente.agregarPaciente(nuevoPaciente);
    res.status(201).json(pacienteAgregado);
  } catch (error: unknown) {
    let mensaje = "Error al crear paciente";
    if (error instanceof Error) {
      mensaje += `: ${error.message}`;
    }
    res.status(400).json({ error: mensaje });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const paciente = servicioPaciente.obtenerPacientePorID(id);

  if (!paciente) {
    return res.status(404).json({ error: "Paciente no encontrado" });
  }

  return res.json(paciente);
});
export default router;
