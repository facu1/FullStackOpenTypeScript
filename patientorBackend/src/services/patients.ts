import patients from "../../data/patientsData";
import { NewPatient, NonSensitivePatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, dateOfBirth, gender, name, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): NonSensitivePatient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();

  const newPatient: Patient = {
    id,
    ...patient,
  };

  patients.push(newPatient);
  const { dateOfBirth, gender, name, occupation } = patient;
  const nonSensitiveNewPatient: NonSensitivePatient = {
    id,
    dateOfBirth,
    gender,
    name,
    occupation,
  };
  return nonSensitiveNewPatient;
};

export default { getPatients, getNonSensitivePatients, addPatient };
