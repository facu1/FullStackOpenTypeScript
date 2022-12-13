import express from "express";
import { parseBmiArguments, calculateBmi } from "./bmiCalculator";
import {
  calculateExercises,
  parseExerciseArguments,
} from "./exerciseCalculator";
const app = express();

app.use(express.json());

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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target: targetBody } = req.body;

  if (!daily_exercises || !targetBody) {
    return res.status(400).send({ error: "parameters missing" });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const { dailyExerciseHours, target } = parseExerciseArguments(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      daily_exercises,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      targetBody
    );

    const exercisesResponse = calculateExercises(dailyExerciseHours, target);
    return res.send(exercisesResponse);
  } catch (error: unknown) {
    return res.send({ error: "malformatted parameters" });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.info(`Server running on port: ${PORT}`);
});
