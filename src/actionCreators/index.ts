import { Action } from "../state";
import { CitiesList, WeatherData } from "../types";

export const setSelectedCityWeather = (data: WeatherData | null): Action => {
  return {
    type: "SET_SELECTED_WEATHER",
    payload: data,
  };
};

export const setFavCitiesList = (data: CitiesList): Action => {
  return {
    type: "SET_FAV_CITIES",
    payload: data,
  };
};

export const setFindedCities = (data: CitiesList | null): Action => {
  return {
    type: "SET_FINDED_CITIES",
    payload: data,
  };
};
