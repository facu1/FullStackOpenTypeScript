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

const calculateRating = (hours: number, target: number): Rating => {
  if (hours < target / 2) {
    return { rating: 1, ratingDescription: "poor performance" };
  } else if (hours < target) {
    return { rating: 2, ratingDescription: "not too bad but could be better" };
  }
  return { rating: 3, ratingDescription: "effective performance" };
};

const calculateExercises = (
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

console.info(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
