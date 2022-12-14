import express from "express";
import cors from "cors";
import diagnoseRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

const app = express();

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get("/api/ping", (_req, res) => {
  console.info("someone pinged here!");
  res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.info(`Server running on port: ${PORT}`);
  console.info(`http://localhost:${PORT}/api/ping`);
  console.info(`http://localhost:${PORT}/api/diagnoses`);
  console.info(`http://localhost:${PORT}/api/patients`);
});
