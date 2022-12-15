import diaries from "../../data/diaries";

import { NonSensitiveDiaryEntry, DiaryEntry, NewDiaryEntry } from "../types";

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

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry: DiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  };

  diaries.push(newDiaryEntry);

  return newDiaryEntry;
};

export default { getEntries, addDiary, getNonSensitiveDiaryEntry, findById };
