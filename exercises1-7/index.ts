import express from "express";
import { parseBmiArguments, calculateBmi } from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height: heightQuery, weight: weightQuery } = req.query;

  try {
    const { height, weight } = parseBmiArguments(heightQuery, weightQuery);
    const bmi = calculateBmi(height, weight);

    res.json({ weight, height, bmi });
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    res.json({
      error: errorMessage,
    });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.info(`Server running on port: ${PORT}`);
});
