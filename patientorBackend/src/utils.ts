import {
  NewEntry,
  Gender,
  NewPatient,
  NewPatientFields,
  Discharge,
  DischargeFields,
  Diagnosis,
  SickLeave,
  SickLeaveFields,
  HealthCheckRating,
  NewEntryFields,
} from "./types";

const baseErrorMssg = "Incorrect or missing";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOB = (dateOB: unknown): string => {
  if (!dateOB || !isString(dateOB) || !isDate(dateOB)) {
    throw new Error(`${baseErrorMssg} date of birth: ${dateOB}`);
  }
  return dateOB;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`${baseErrorMssg} gender: ${gender}`);
  }
  return gender;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`${baseErrorMssg} name: ${name}`);
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`${baseErrorMssg} occupation: ${occupation}`);
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`${baseErrorMssg} ssn: ${ssn}`);
  }
  return ssn;
};

export const parseId = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error(`${baseErrorMssg} id: ${id}`);
  }
  return id;
};

export const toNewPatient = ({
  dateOfBirth,
  gender,
  name,
  occupation,
  ssn,
}: NewPatientFields): NewPatient => {
  const newPatient: NewPatient = {
    dateOfBirth: parseDateOB(dateOfBirth),
    gender: parseGender(gender),
    name: parseName(name),
    occupation: parseOccupation(occupation),
    ssn: parseSsn(ssn),
  };
  return newPatient;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`${baseErrorMssg} date: ${date}`);
  }
  return date;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error(`${baseErrorMssg} description: ${description}`);
  }
  return description;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error(`${baseErrorMssg} criteria: ${criteria}`);
  }
  return criteria;
};

const parseDischarge = (discharge: DischargeFields): Discharge => {
  if (!discharge) {
    throw new Error(`${baseErrorMssg} discharge: ${discharge}`);
  }
  const { date, criteria } = discharge;
  const newDischarge: Discharge = {
    criteria: parseCriteria(criteria),
    date: parseDate(date),
  };
  return newDischarge;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`${baseErrorMssg} specialist: ${specialist}`);
  }
  return specialist;
};

const isDiagnosisCodeArray = (
  diagnosisCodes: unknown
): diagnosisCodes is Array<Diagnosis["code"]> => {
  return (
    Array.isArray(diagnosisCodes) &&
    diagnosisCodes.every((diagnosisCode) => typeof diagnosisCode === "string")
  );
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnosis["code"]> | undefined => {
  if (!diagnosisCodes) return undefined;
  else if (!isDiagnosisCodeArray(diagnosisCodes)) {
    throw new Error(`${baseErrorMssg} diagnosisCodes: ${diagnosisCodes}`);
  }
  return diagnosisCodes;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error(`${baseErrorMssg} employerName: ${employerName}`);
  }
  return employerName;
};

const parseSickLeave = (
  sickLeave: SickLeaveFields | undefined
): SickLeave | undefined => {
  if (!sickLeave) return undefined;
  const { endDate, startDate } = sickLeave;
  const newSickLeave: SickLeave = {
    endDate: parseDate(endDate),
    startDate: parseDate(startDate),
  };
  return newSickLeave;
};

const isHealthCheckRating = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  healthCheckRating: any
): healthCheckRating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const isNumber = (num: unknown): num is number => {
  return typeof num === "number" || num instanceof Number;
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(`${baseErrorMssg} healthCheckRating: ${healthCheckRating}`);
  }
  return healthCheckRating;
};

export const toNewEntry = (entryFields: NewEntryFields): NewEntry => {
  switch (entryFields.type) {
    case "Hospital": {
      const { date, description, discharge, specialist, type, diagnosisCodes } =
        entryFields;
      const newEntry: NewEntry = {
        date: parseDate(date),
        description: parseDescription(description),
        discharge: parseDischarge(discharge as DischargeFields),
        specialist: parseSpecialist(specialist),
        type,
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
      };
      return newEntry;
    }
    case "OccupationalHealthcare": {
      const {
        date,
        description,
        employerName,
        specialist,
        type,
        diagnosisCodes,
        sickLeave,
      } = entryFields;
      const newEntry: NewEntry = {
        date: parseDate(date),
        description: parseDescription(description),
        employerName: parseEmployerName(employerName),
        specialist: parseSpecialist(specialist),
        type,
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        sickLeave: parseSickLeave(sickLeave as SickLeaveFields),
      };
      return newEntry;
    }
    case "HealthCheck": {
      const {
        date,
        description,
        healthCheckRating,
        specialist,
        type,
        diagnosisCodes,
      } = entryFields;
      const newEntry: NewEntry = {
        date: parseDate(date),
        description: parseDescription(description),
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
        specialist: parseSpecialist(specialist),
        type,
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
      };
      return newEntry;
    }
    default:
      return assertNever(entryFields);
  }
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
