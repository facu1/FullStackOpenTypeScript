interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  rating: number;
  ratingDescription:
    | "poor performance"
    | "not too bad but could be better"
    | "effective performance";
}

interface ExerciseValues {
  dailyExerciseHours: number[];
  target: number;
}

export const parseExerciseArguments = (
  exerciseValues: string[],
  target: string
): ExerciseValues => {
  if (
    exerciseValues.every((e) => !isNaN(Number(e))) &&
    !isNaN(Number(target))
  ) {
    return {
      dailyExerciseHours: exerciseValues.map((e) => Number(e)),
      target: Number(target),
    };
  } else throw new Error("Provided values were not numbers!");
};

const calculateRating = (hours: number, target: number): Rating => {
  if (hours < target / 2) {
    return { rating: 1, ratingDescription: "poor performance" };
  } else if (hours < target) {
    return { rating: 2, ratingDescription: "not too bad but could be better" };
  }
  return { rating: 3, ratingDescription: "effective performance" };
};

export const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): Result => {
  let periodLength = 0;
  let trainingDays = 0;
  let totalHours = 0;

  for (const hours of dailyExerciseHours) {
    periodLength++;
    if (hours > 0) trainingDays++;
    totalHours += hours;
  }

  const average = totalHours / periodLength;
  const success = average >= target;

  return {
    periodLength,
    trainingDays,
    success,
    ...calculateRating(average, target),
    target,
    average,
  };
};

// try {
//   const { dailyExerciseHours, target } = parseExerciseArguments(process.argv);
//   console.log(calculateExercises(dailyExerciseHours, target));
// } catch (error: unknown) {
//   let errorMessage = "Something went wrong.";
//   if (error instanceof Error) {
//     errorMessage += ` Error: ${error.message}`;
//   }
//   console.info(errorMessage);
// }
