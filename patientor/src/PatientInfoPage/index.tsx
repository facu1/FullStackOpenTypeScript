import { Female as FemaleIcon, Male as MaleIcon } from "@mui/icons-material";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
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

  const diagnosisDesc = (diagnosisCode: string): string | undefined =>
    diagnoses?.find(({ code }) => code === diagnosisCode)?.name;

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
      {patient.entries?.map(({ id, date, description, diagnosisCodes }) => (
        <div key={id}>
          <p>
            {date} {description}
          </p>
          <ul>
            {diagnosisCodes?.map((diagnosisCode) => (
              <li key={`${id}_${diagnosisCode}`}>
                {diagnosisCode} {diagnosisDesc(diagnosisCode)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default PatientInfoPage;
