import React, { useEffect, useRef, useState } from "react";
import CitiesListElement from "./components/CitiesListElement";
import SearchBar from "./components/searchBar";
import WeatherInfo from "./components/WeatherInfo";
import { getCitiesList, getWeather } from "./services/weatherService";
import { CitiesList, SearchBarRefType, WeatherData } from "./types";

/*
ToDo:
1. Refactor this horrible mess
2. Expand weather info block 
3. Add styling
4. Add favourite places via cookies


*/

const App = () => {
  const [curretCityWeatherData, setCurretData] = useState<WeatherData | null>(
    null
  );
  const [findedCitiesList, setFindedCitiesList] = useState<CitiesList | null>(
    null
  );
  const [isListVisible, setListVisible] = useState<boolean>(false);
  const SearchBarRef = useRef<SearchBarRefType>(null);
  return (
    <div>
      <SearchBar
        setList={setFindedCitiesList}
        ref={SearchBarRef}
        toggleVisible={setListVisible}
      />
      <CitiesListElement
        list={findedCitiesList}
        setWeather={setCurretData}
        searchRef={SearchBarRef}
        isVisible={isListVisible}
        toggleVisible={setListVisible}
      />
      {curretCityWeatherData ? (
        <WeatherInfo data={curretCityWeatherData} />
      ) : (
        <h1>Please, select a city to watch the weather</h1>
      )}
    </div>
  );
};

export default App;
