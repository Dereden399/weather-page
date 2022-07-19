import React, { useContext, useReducer, createContext } from "react";
import { CitiesList, WeatherData } from "../types";
import { Action } from "./reducer";

export type State = {
  selectedCityWeather: WeatherData | null;
  favCitiesList: CitiesList;
  findedCitiesList: CitiesList | null;
};

const initialState: State = {
  selectedCityWeather: null,
  favCitiesList: { data: [] },
  findedCitiesList: null,
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
