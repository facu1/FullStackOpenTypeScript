import { useStateValue } from "../state";
import { OccupationalHealthcareEntry } from "../types";
import { diagnosisDesc } from "../utils";

import WorkIcon from "@mui/icons-material/Work";
import "./EntryDetail.css";

const OccupationalHealthcare = ({
  id,
  date,
  employerName,
  description,
  specialist,
  diagnosisCodes,
}: OccupationalHealthcareEntry) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div className="entry-detail">
      <p>
        {date} <WorkIcon /> <em>{employerName}</em>
      </p>
      <p>
        <em>{description}</em>
      </p>
      <p>diagnose by {specialist}</p>
      <ul>
        {diagnosisCodes?.map((diagnosisCode) => (
          <li key={`${id}_${diagnosisCode}`}>
            {diagnosisCode} {diagnosisDesc(diagnosisCode, diagnoses)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OccupationalHealthcare;
