import patients from "../../data/patientsData";
import { NewPatient, PublicPatient, Patient, NewEntry, Entry } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patients;
};

const getOnePatient = (id: string): Patient => {
  const patient = patients.find((p) => p.id === id);

  if (!patient) throw new Error(`Patient with id: ${id} not found`);

  return patient;
};

const getNonSensitivePatients = (): PublicPatient[] => {
  return patients.map(({ id, dateOfBirth, gender, name, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): PublicPatient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();

  const newPatient: Patient = {
    id,
    ...patient,
    entries: [],
  };

  patients.push(newPatient);
  const { dateOfBirth, gender, name, occupation } = patient;
  const nonSensitiveNewPatient: PublicPatient = {
    id,
    dateOfBirth,
    gender,
    name,
    occupation,
  };
  return nonSensitiveNewPatient;
};

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const patient = patients.find((patient) => patient.id === patientId);
  if (!patient) {
    throw new Error(`Patient with id=${patientId} not found.`);
  }
  const id: string = uuid();
  const newEntry: Entry = {
    id,
    ...entry,
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getOnePatient,
  addEntry,
};
