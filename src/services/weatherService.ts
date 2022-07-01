import axios from "axios";
import { CitiesList, WeatherData } from "../types";

const weatherApi = process.env.REACT_APP_WEATHER_API;

const weatherLink =
  "https://api.openweathermap.org/data/2.5/weather?units=metric";
const citiesLink =
  "http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=10";

export const getWeather = async (
  lon: number,
  lat: number,
  cityName: string
): Promise<WeatherData> => {
  const { data: weather } = await axios.get<WeatherData>(
    weatherLink + `&lon=${lon}&lat=${lat}&appid=${weatherApi}`
  );
  if (Number(weather.cod) !== 200) {
    throw new Error("city not found");
  }
  return { ...weather, name: cityName };
};

export const getCitiesList = async (cityName: string): Promise<CitiesList> => {
  const { data: list } = await axios.get<CitiesList>(
    citiesLink + `&namePrefix=${cityName}`
  );
  return list;
};
