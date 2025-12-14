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

export default router;
