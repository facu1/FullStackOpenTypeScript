import { useStateValue } from "../state";
import { HealthCheckEntry } from "../types";
import { diagnosisDesc, getHealthCheckColor } from "../utils";

import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./EntryDetail.css";

const HealthCheck = ({
  id,
  date,
  description,
  healthCheckRating,
  specialist,
  diagnosisCodes,
}: HealthCheckEntry) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div className="entry-detail">
      <p>
        {date} <MedicalServicesIcon />
      </p>
      <p>
        <em>{description}</em>
      </p>
      <FavoriteIcon sx={{ color: getHealthCheckColor(healthCheckRating) }} />
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

export default HealthCheck;
