import React, { useEffect, useRef, useState } from "react";
import CitiesListElement from "./components/CitiesListElement";
import MainPage from "./components/MainPage";
import SearchBar from "./components/searchBar";
import WeatherInfo from "./components/WeatherInfo";
import { CitiesList, SearchBarRefType, WeatherData } from "./types";
import { useCookies } from "react-cookie";

/*
ToDo:
1. Refactor this horrible mess 
2. Expand weather info block  - x
3. Add styling
4. Add favourite places via cookies
5. Fix the bug with the delayed search when the close button is pressed
*/

const App = () => {
  const [cookies, setCookies] = useCookies(["favouriteList"]);
  const [curretCityWeatherData, setCurretData] = useState<WeatherData | null>(
    null
  );
  const [findedCitiesList, setFindedCitiesList] = useState<CitiesList | null>(
    null
  );
  const [favouriteCities, setFavouriteCities] = useState<CitiesList>({
    data: [],
  });
  const [isSearchActive, setSearchActive] = useState<boolean>(false);
  const SearchBarRef = useRef<SearchBarRefType>(null);
  useEffect(() => {
    if (cookies.favouriteList) {
      setFavouriteCities(cookies.favouriteList);
    }
  }, []);
  const setFavCitiesWithCookies = (list: CitiesList) => {
    setFavouriteCities(list);
    setCookies("favouriteList", list, { path: "/" });
  };

  return (
    <div className='bg-waterBackground bg-cover bg-no-repeat bg-right-top w-screen h-screen flex flex-col items-center justify-center p-1 md:p-2 lg:p-3'>
      <SearchBar
        setList={setFindedCitiesList}
        ref={SearchBarRef}
        toggleActive={setSearchActive}
        setWeatherData={setCurretData}
        isActive={isSearchActive}
      />
      <CitiesListElement
        isVisible={isSearchActive}
        list={findedCitiesList}
        setWeather={setCurretData}
        searchRef={SearchBarRef}
        favCitiesList={favouriteCities}
        setFavCitiesList={setFavCitiesWithCookies}
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
