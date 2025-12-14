import express from "express";
import servicioPaciente from "../servicios/servicioPaciente";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(servicioPaciente.obtenerPacientes());
});

router.post("/", (req, res) => {
  try {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;

    if (!name || !dateOfBirth || !ssn || !gender || !occupation) {
      return res.status(400).json({ error: "Faltan campos" });
    }

    const nuevoPaciente = servicioPaciente.agregarPaciente({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
    });

    return res.status(201).json(nuevoPaciente);
  } catch {
    return res.status(400).json({ error: "Datos no válidos" });
  }
});

export default router;
