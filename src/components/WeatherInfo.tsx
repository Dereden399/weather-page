import React from "react";
import { WeatherData } from "../types";

const WeatherInfo = ({ data }: { data: WeatherData }) => {
  return (
    <div>
      <h1>{data.name}</h1>
    </div>
  );
};

export default WeatherInfo;
