interface BmiValues {
  height: number;
  weight: number;
}

export const parseBmiArguments = (
  heightArg: unknown,
  weightArg: unknown
): BmiValues => {
  if (!heightArg || !weightArg) {
    throw new Error("Not height or weight argument provided");
  }
  if (!isNaN(Number(heightArg)) && !isNaN(Number(weightArg))) {
    return {
      height: Number(heightArg),
      weight: Number(weightArg),
    };
  } else throw new Error("Provided values were not numbers!");
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 18.5) {
    return "Underweight (Unhealthy)";
  } else if (bmi < 25) {
    return "Normal (Healthy weight)";
  } else {
    return "Overweight (Obese)";
  }
};
