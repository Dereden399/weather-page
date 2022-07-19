import { CitiesList, WeatherData } from "../types";
import { State } from "./state";

export type Action =
  | { type: "SET_SELECTED_WEATHER"; payload: WeatherData | null }
  | { type: "SET_FINDED_CITIES"; payload: CitiesList | null }
  | { type: "SET_FAV_CITIES"; payload: CitiesList };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SELECTED_WEATHER":
      return {
        ...state,
        selectedCityWeather: action.payload,
      };
    case "SET_FINDED_CITIES":
      return {
        ...state,
        findedCitiesList: action.payload,
      };
    case "SET_FAV_CITIES":
      return {
        ...state,
        favCitiesList: action.payload,
      };
    default:
      return state;
  }
};
