import express from "express";
import { calculator } from "./calculator";
const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.post("/calculate", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if (!value1 || isNaN(Number(value1)) || !value2 || isNaN(Number(value2))) {
    return res
      .status(400)
      .send({ error: "Provided values to calculate were not numbers!" });
  }

  if (!op) {
    return res
      .status(400)
      .json({ error: "Provided operation were not valid!" });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculator(Number(value1), Number(value2), op);
    return res.send(result.toString());
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) errorMessage += ` Error: ${error.message}`;
    return res.send({ error: errorMessage });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.info(`Server runnning on port ${PORT}`);
});
