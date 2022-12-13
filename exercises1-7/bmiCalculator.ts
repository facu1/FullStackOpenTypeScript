const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 18.5) {
    return "Underweight (Unhealthy)";
  } else if (bmi < 25) {
    return "Normal (Healthy weight)";
  } else {
    return "Overweight (Obese)";
  }
};

console.info(calculateBmi(180, 74));
