import React, { useEffect, useState } from "react";
import SearchBar from "./components/searchBar";
import WeatherInfo from "./components/WeatherInfo";
import { getWeather } from "./services/weatherService";
import { WeatherData } from "./types";

const App = () => {
  const [curretCityData, setCurretData] = useState<WeatherData | null>(null);
  return (
    <div>
      <SearchBar />
      {curretCityData ? (
        <WeatherInfo data={curretCityData} />
      ) : (
        <h1>Please, select a city to watch the weather</h1>
      )}
    </div>
  );
};

export default App;
