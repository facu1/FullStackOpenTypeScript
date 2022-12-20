import { Female as FemaleIcon, Male as MaleIcon } from "@mui/icons-material";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const patient = Object.values(patients).find((patient) => patient?.id === id);

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "UPDATE_PATIENT", payload: patient });
      } catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
          errorMessage += ` Error: ${error.message}`;
        }
        console.error(errorMessage);
      }
    };

    if (id && !patient?.ssn) void fetchPatient(id);
  }, []);

  if (!patient) return <h1>Patient not Found</h1>;

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
    </>
  );
};

export default PatientInfoPage;
