import axios from "axios";
import { CitiesList, WeatherData } from "../types";

const weatherApi = process.env.REACT_APP_WEATHER_API;

const weatherLink =
  "https://api.openweathermap.org/data/2.5/weather?units=metric";
const citiesLink =
  "http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=10";

export const getWeather = async (cityName: string): Promise<WeatherData> => {
  const { data: weather } = await axios.get<WeatherData>(
    weatherLink + `&q=${cityName}&appid=${weatherApi}`
  );
  if (Number(weather.cod) !== 200) {
    throw new Error("city not found");
  }
  return weather;
};

export const getCitiesList = async (cityName: string): Promise<CitiesList> => {
  const { data: list } = await axios.get<CitiesList>(
    citiesLink + `&namePrefix=${cityName}`
  );
  return list;
};
