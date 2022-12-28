import { Diagnosis, HealthCheckRating } from "./types";

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const diagnosisDesc = (
  diagnosisCode: string,
  diagnoses: Diagnosis[]
): string | undefined =>
  diagnoses?.find(({ code }) => code === diagnosisCode)?.name;

export const getHealthCheckColor = (healthCheckRating: HealthCheckRating) => {
  const colorArray = ["green", "yellow", "orange", "red"];
  return colorArray[healthCheckRating];
};
