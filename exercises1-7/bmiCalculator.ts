interface BmiValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  else if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]) / 100,
      weight: Number(args[3]),
    };
  } else throw new Error("Provided values were not numbers!");
};

const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / Math.pow(height, 2);

  if (bmi < 18.5) {
    return console.info("Underweight (Unhealthy)");
  } else if (bmi < 25) {
    return console.info("Normal (Healthy weight)");
  } else {
    return console.info("Overweight (Obese)");
  }
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  calculateBmi(height, weight);
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.info(errorMessage);
}
