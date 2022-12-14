import express from "express";
import diagnosService from "../services/diagnoses";
const diagnoseRouter = express.Router();

diagnoseRouter.get("/", (_req, res) => {
  res.send(diagnosService.getDiagnoses());
});

export default diagnoseRouter;
