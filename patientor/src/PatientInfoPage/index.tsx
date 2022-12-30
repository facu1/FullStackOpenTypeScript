import { Female as FemaleIcon, Male as MaleIcon } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Entry, EntryFormValues, NewEntry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";
import Hospital from "../components/Hospital";
import OccupationalHealthcare from "../components/OccupationalHealthcare";
import HealthCheck from "../components/HealthCheck";
import { assertNever } from "../utils";
import { Button } from "@material-ui/core";
import AddEntryModal from "../AddEntry";

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => setModalOpen(false);

  const patient = Object.values(patients).find((patient) => patient?.id === id);

  useEffect(() => {
    if (!!Object.keys(patients).length && id && !patient?.ssn) {
      const fetchPatient = async (id: string) => {
        try {
          const { data: patient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(updatePatient(patient));
        } catch (error: unknown) {
          let errorMessage = "Something went wrong.";
          if (error instanceof Error) {
            errorMessage += ` Error: ${error.message}`;
          }
          console.error(errorMessage);
        }
      };

      void fetchPatient(id);
    }
  }, [patients]);

  if (!patient) return <h1>Patient not Found</h1>;

  const EntryDetails: React.FC<Entry> = (entry) => {
    switch (entry.type) {
      case "Hospital":
        return <Hospital key={entry.id} {...entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcare key={entry.id} {...entry} />;
      case "HealthCheck":
        return <HealthCheck key={entry.id} {...entry} />;
      default:
        return assertNever(entry);
    }
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    const {
      date,
      description,
      dischargeCriteria,
      dischargeDate,
      specialist,
      type,
      diagnosisCodes,
    } = values;
    const newEntry: NewEntry = {
      date,
      description,
      discharge: {
        criteria: dischargeCriteria,
        date: dischargeDate,
      },
      specialist,
      type,
      diagnosisCodes,
    };

    const { data: entry } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${patient.id}/entries`,
      newEntry
    );

    const modifiedPatient: Patient = {
      ...patient,
      entries: patient.entries.concat(entry),
    };
    dispatch(updatePatient(modifiedPatient));
    closeModal();
  };

  return (
    <>
      <h2>
        <strong>{patient.name}</strong>
        {patient.gender === "male" ? (
          <MaleIcon />
        ) : (
          patient.gender === "female" && <FemaleIcon />
        )}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>ocupation: {patient.occupation}</p>
      <h3>
        <strong>entries</strong>
      </h3>
      {patient.entries?.map((entry) => EntryDetails(entry))}
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
      />
      <Button variant="contained" onClick={openModal}>
        ADD NEW ENTRY
      </Button>
    </>
  );
};

export default PatientInfoPage;
