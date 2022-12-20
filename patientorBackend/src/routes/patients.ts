import express from "express";
import patientsService from "../services/patients";
import { NewPatientFields } from "../types";
import { parseId, toNewPatient } from "../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

patientRouter.get("/:id", (req, res) => {
  try {
    const { id } = req.params;

    const patient = patientsService.getOnePatient(parseId(id));
    res.send(patient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    res.status(404).send(errorMessage);
  }
});

patientRouter.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body as NewPatientFields);

    const addedPatient = patientsService.addPatient(newPatient);
    res.send(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientRouter;
