import express from "express";
import diagnosesService from "../services/diagnoses";
const diagnoseRouter = express.Router();

diagnoseRouter.get("/", (_req, res) => {
  res.send(diagnosesService.getDiagnoses());
});

export default diagnoseRouter;
