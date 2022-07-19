import React, { useEffect, useRef, useState } from "react";
import { useStateValue } from "./state";
import { setFavCitiesList } from "./actionCreators";
import CitiesListElement from "./components/CitiesListElement";
import MainPage from "./components/MainPage";
import SearchBar from "./components/searchBar";
import WeatherInfo from "./components/WeatherInfo";
import { CitiesList, SearchBarRefType, Theme } from "./types";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookies] = useCookies(["favouriteList"]);
  const [isSearchActive, setSearchActive] = useState<boolean>(false);
  const [appTheme, setAppTheme] = useState<Theme>(Theme.Rainy);
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
  const changeTheme = (theme: Theme) => {
    switch (theme) {
      case Theme.Rainy:
        setAppTheme(Theme.Rainy);
        document.documentElement.style.setProperty(
          "--mainColor-100",
          "181 215 255"
        );
        document.documentElement.style.setProperty(
          "--mainColor-200",
          "140 175 220"
        );
        document.documentElement.style.setProperty(
          "--mainColor-300",
          "109 147 193"
        );
        document.documentElement.style.setProperty(
          "--mainColor-400",
          "100 136 179"
        );
        document.documentElement.style.setProperty(
          "--mainColor-500",
          "61 99 140"
        );
        document.documentElement.style.setProperty(
          "--mainColor-600",
          "17 64 102"
        );
        document.documentElement.style.setProperty(
          "--mainColor-700",
          "10 43 69"
        );
        return;
      case Theme.Sunny:
        setAppTheme(Theme.Sunny);
        document.documentElement.style.setProperty(
          "--mainColor-100",
          "253 194 129"
        );
        document.documentElement.style.setProperty(
          "--mainColor-200",
          "255 171 78"
        );
        document.documentElement.style.setProperty(
          "--mainColor-300",
          "235 158 72"
        );
        document.documentElement.style.setProperty(
          "--mainColor-400",
          "208 131 37"
        );
        document.documentElement.style.setProperty(
          "--mainColor-500",
          "161 65 0"
        );
        document.documentElement.style.setProperty(
          "--mainColor-600",
          "117 44 0"
        );
        document.documentElement.style.setProperty(
          "--mainColor-700",
          "79 20 0"
        );
        return;
      default:
        setAppTheme(Theme.Rainy);
        return;
    }
  };
  return (
    <div
      className={`${
        appTheme === Theme.Rainy ? "bg-waterBackground" : "bg-sunnyBackground"
      } bg-cover bg-no-repeat bg-right-top w-screen h-screen flex flex-col items-center justify-center p-1 md:p-2 lg:p-3`}
    >
      <SearchBar
        ref={SearchBarRef}
        toggleActive={setSearchActive}
        isActive={isSearchActive}
      />
      <CitiesListElement
        isVisible={isSearchActive}
        searchRef={SearchBarRef}
        setFavCitiesList={setFavCitiesWithCookies}
        changeTheme={changeTheme}
      />
      {selectedCityWeather ? <WeatherInfo /> : <MainPage />}
    </div>
  );
};

export default App;
