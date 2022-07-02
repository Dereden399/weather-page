import React, { useRef, useState } from "react";
import CitiesListElement from "./components/CitiesListElement";
import MainPage from "./components/MainPage";
import SearchBar from "./components/searchBar";
import WeatherInfo from "./components/WeatherInfo";
import { CitiesList, SearchBarRefType, WeatherData } from "./types";

/*
ToDo:
1. Refactor this horrible mess 
2. Expand weather info block  - x
3. Add styling
4. Add favourite places via cookies
5. Fix the bug with the delayed search when the close button is pressed
*/

const App = () => {
  const [curretCityWeatherData, setCurretData] = useState<WeatherData | null>(
    null
  );
  const [findedCitiesList, setFindedCitiesList] = useState<CitiesList | null>(
    null
  );
  const [favouriteCities, setFavouriteCities] = useState<CitiesList>({
    data: [],
  });
  const [isListVisible, setListVisible] = useState<boolean>(false);
  const SearchBarRef = useRef<SearchBarRefType>(null);

  return (
    <div>
      <SearchBar
        setList={setFindedCitiesList}
        ref={SearchBarRef}
        toggleVisible={setListVisible}
        setWeatherData={setCurretData}
      />
      <CitiesListElement
        list={findedCitiesList}
        setWeather={setCurretData}
        searchRef={SearchBarRef}
        favCitiesList={favouriteCities}
        setFavCitiesList={setFavouriteCities}
      />
      {curretCityWeatherData ? (
        <WeatherInfo data={curretCityWeatherData} />
      ) : (
        <MainPage />
      )}
    </div>
  );
};

export default App;
