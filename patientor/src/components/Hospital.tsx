import { useStateValue } from "../state";
import { HospitalEntry } from "../types";
import { diagnosisDesc } from "../utils";

import "./EntryDetail.css";

const Hospital = ({ id, date, description, diagnosisCodes }: HospitalEntry) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div className="entry-detail">
      <p>
        {date} {description}
      </p>
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

export default Hospital;
