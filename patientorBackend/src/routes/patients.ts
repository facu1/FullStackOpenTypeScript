import express from "express";
import patientsService from "../services/patients";
import { NewEntryFields, NewPatientFields } from "../types";
import { parseId, toNewEntry, toNewPatient } from "../utils";

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

patientRouter.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body as NewEntryFields);
    const { id } = req.params;

    const addedEntry = patientsService.addEntry(newEntry, parseId(id));
    res.send(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientRouter;
