import { Gender, NewPatient, NewPatientFields } from "./types";

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
