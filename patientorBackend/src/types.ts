// Diagnosis

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// Entry

interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface SickLeaveFields {
  startDate: unknown;
  endDate: unknown;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface DischargeFields {
  date: unknown;
  criteria: unknown;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type NewEntry = UnionOmit<Entry, "id">;

interface BaseEntryFields {
  date: unknown;
  specialist: unknown;
  description: unknown;
  diagnosisCodes?: unknown;
}

export interface HealthCheckEntryFields extends BaseEntryFields {
  type: "HealthCheck";
  healthCheckRating: unknown;
}

export interface OccupationalHealthcareEntryFields extends BaseEntryFields {
  type: "OccupationalHealthcare";
  employerName: unknown;
  sickLeave?: unknown;
}

export interface HospitalEntryFields extends BaseEntryFields {
  type: "Hospital";
  discharge: unknown;
}

export type NewEntryFields =
  | HealthCheckEntryFields
  | OccupationalHealthcareEntryFields
  | HospitalEntryFields;

// Patient

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NewPatient = Omit<Patient, "id" | "entries">;

export type NewPatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export type PublicPatient = Omit<Patient, "ssn" | "entries">;
