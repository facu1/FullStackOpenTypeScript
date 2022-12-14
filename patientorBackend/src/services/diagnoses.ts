import diagnosesData from "../../data/diagnosesData";
import { Diagnose } from "../types";

const getDiagnoses = (): Diagnose[] => {
  return diagnosesData;
};

export default { getDiagnoses };
