import React, { useEffect, useState } from "react";
import CitiesListElement from "./components/CitiesListElement";
import SearchBar from "./components/searchBar";
import WeatherInfo from "./components/WeatherInfo";
import { getCitiesList, getWeather } from "./services/weatherService";
import { CitiesList, WeatherData } from "./types";

const App = () => {
  const [curretCityWeatherData, setCurretData] = useState<WeatherData | null>(
    null
  );
  const [findedCitiesList, setFindedCitiesList] = useState<CitiesList | null>(
    null
  );
  return (
    <div>
      <SearchBar setList={setFindedCitiesList} />
      <CitiesListElement list={findedCitiesList} setWeather={setCurretData} />
      {curretCityWeatherData ? (
        <WeatherInfo data={curretCityWeatherData} />
      ) : (
        <h1>Please, select a city to watch the weather</h1>
      )}
    </div>
  );
};

export default App;
