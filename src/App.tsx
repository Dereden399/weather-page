import React, { useEffect, useRef, useState } from "react";
import { useStateValue } from "./state";
import { setFavCitiesList } from "./actionCreators";
import CitiesListElement from "./components/CitiesListElement";
import MainPage from "./components/MainPage";
import SearchBar from "./components/searchBar";
import WeatherInfo from "./components/WeatherInfo";
import { CitiesList, SearchBarRefType } from "./types";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookies] = useCookies(["favouriteList"]);
  const [isSearchActive, setSearchActive] = useState<boolean>(false);
  const [{ selectedCityWeather }, dispatch] = useStateValue();
  const SearchBarRef = useRef<SearchBarRefType>(null);
  useEffect(() => {
    if (cookies.favouriteList) {
      dispatch(setFavCitiesList(cookies.favouriteList));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const setFavCitiesWithCookies = (list: CitiesList) => {
    dispatch(setFavCitiesList(list));
    setCookies("favouriteList", list, { path: "/" });
  };

  return (
    <div className='bg-waterBackground bg-cover bg-no-repeat bg-right-top w-screen h-screen flex flex-col items-center justify-center p-1 md:p-2 lg:p-3'>
      <SearchBar
        ref={SearchBarRef}
        toggleActive={setSearchActive}
        isActive={isSearchActive}
      />
      <CitiesListElement
        isVisible={isSearchActive}
        searchRef={SearchBarRef}
        setFavCitiesList={setFavCitiesWithCookies}
      />
      {selectedCityWeather ? <WeatherInfo /> : <MainPage />}
    </div>
  );
};

export default App;
