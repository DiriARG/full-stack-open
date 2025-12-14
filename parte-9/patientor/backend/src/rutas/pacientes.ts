import express from "express";
import servicioPaciente from "../servicios/servicioPaciente";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(servicioPaciente.obtenerPacientes());
});

export default router;
