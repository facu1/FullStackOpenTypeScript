import diaries from "../../data/diaries";

import { NonSensitiveDiaryEntry, DiaryEntry } from "../types";

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveDiaryEntry = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, visibility, weather }) => ({
    id,
    date,
    visibility,
    weather,
  }));
};

const addDiary = () => {
  return null;
};

export default { getEntries, addDiary, getNonSensitiveDiaryEntry };
