import React, { createContext, useContext, useReducer } from "react";
import { Diagnosis, Patient } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient | undefined };
  diagnoses: Diagnosis[];
};
// export interface State {
//   patients: Map<string, Patient>;
// }

// const myPatient = state.patients.get('non-existing-id'); // type for myPatient is now Patient | undefined
// console.log(myPatient.name); // error, Object is possibly 'undefined'

// console.log(myPatient?.name); // valid code, but will log 'undefined'

const initialState: State = {
  patients: {},
  diagnoses: [],
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
