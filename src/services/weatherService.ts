import axios from "axios";
import { WeatherData } from "../types";

const weatherApi = process.env.REACT_APP_WEATHER_API;

const link = "https://api.openweathermap.org/data/2.5/weather?";

export const getWeather = async (cityName: string): Promise<WeatherData> => {
  console.log(weatherApi);
  const { data: weather } = await axios.get<WeatherData>(
    link + `q=${cityName}&appid=${weatherApi}&units=metric`
  );
  if (Number(weather.cod) === 404) {
    throw new Error("city not found");
  }
  return weather;
};
