import React from "react";
import { WeatherData } from "../types";
import { IoIosWater } from "react-icons/io";
import { FiWind, FiCloud } from "react-icons/fi";

const WeatherInfo = ({ data }: { data: WeatherData }) => {
  return (
    <div>
      <img
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
        alt={data.weather[0].description}
      />
      <div>
        <h1>
          {data.name}, {data.sys.country}
        </h1>
        <h3>{data.weather[0].main}</h3>
        <i>{data.weather[0].description}</i>
        <div>
          The temperature is {data.main.temp}°C. Feels like{" "}
          {data.main.feels_like}°C
          <IoIosWater /> {data.main.humidity}%
          <p>The pressure is {data.main.pressure} hPa</p>
          <FiWind /> {data.wind.speed} m/s {data.wind.deg}° <br />
          <FiCloud /> {data.clouds.all}
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
