import React, { useState } from "react";
import { getWeather } from "../services/weatherService";
import { CitiesList, City, SearchBarRefType, WeatherData } from "../types";
import { HiStar } from "react-icons/hi";

const CityListElement = ({
  setFavCities,
  clickHandler,
  city,
  favList,
  favLen,
  toggleAlert,
}: {
  setFavCities: (list: CitiesList) => void;
  clickHandler: (e: React.MouseEvent<HTMLElement>, city: City) => Promise<void>;
  city: City;
  favList: CitiesList;
  favLen: number;
  toggleAlert: () => void;
}) => {
  let isFavourite = favList.data.some(e => e.name === city.name) || false;
  const favHandler = () => {
    if (!isFavourite) {
      if (favLen > 8) {
        toggleAlert();
        return;
      }
      setFavCities({ data: favList.data.concat(city) });
      isFavourite = true;
      return;
    }
    setFavCities({ data: favList.data.filter(x => x.name !== city.name) });
    isFavourite = false;
  };
  return (
    <li key={city.id}>
      <b onClick={e => clickHandler(e, city)}>{city.name}</b>
      <button onClick={favHandler}>
        <HiStar color={isFavourite ? "yellow" : "gray"} size={24} />
      </button>
    </li>
  );
};

const FavCityElement = ({
  setFavCities,
  clickHandler,
  city,
  favList,
}: {
  setFavCities: (list: CitiesList) => void;
  clickHandler: (e: React.MouseEvent<HTMLElement>, city: City) => Promise<void>;
  city: City;
  favList: CitiesList;
}) => {
  const favHandler = () => {
    setFavCities({ data: favList.data.filter(x => x.name !== city.name) });
  };
  return (
    <li key={city.id}>
      <b onClick={e => clickHandler(e, city)}>{city.name}</b>
      <button onClick={favHandler}>
        <HiStar color={"yellow"} size={24} />
      </button>
    </li>
  );
};

const FavList = ({
  setFavCities,
  clickHandler,
  len,
  favList,
  alertActive,
}: {
  setFavCities: (list: CitiesList) => void;
  clickHandler: (e: React.MouseEvent<HTMLElement>, city: City) => Promise<void>;
  len: number;
  favList: CitiesList;
  alertActive: boolean;
}) => {
  if (!len) return null;
  return (
    <>
      {alertActive ? <p>You can save only 9 favourite cities</p> : null}
      <ul>
        {favList.data.map(el => (
          <FavCityElement
            setFavCities={setFavCities}
            clickHandler={clickHandler}
            city={el}
            favList={favList}
          />
        ))}
      </ul>
      <hr />
    </>
  );
};

const CitiesListElement = ({
  list,
  setWeather,
  searchRef,
  favCitiesList,
  setFavCitiesList,
  isVisible,
}: {
  list: CitiesList | null;
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>;
  searchRef: React.RefObject<SearchBarRefType>;
  favCitiesList: CitiesList;
  setFavCitiesList: (list: CitiesList) => void;
  isVisible: boolean;
}) => {
  const [alertActive, setAlertActive] = useState<boolean>(false);
  if (!isVisible) return null;

  const toggleAlert = () => {
    window.localStorage.removeItem("alertTimer");
    setAlertActive(true);
    const tim = setTimeout(() => setAlertActive(false), 1000);
    window.localStorage.setItem("alertTimer", String(tim));
  };

  const findAndSetWeather = async (
    e: React.MouseEvent<HTMLElement>,
    city: City
  ) => {
    e.preventDefault();
    const findedWeather = await getWeather(
      city.longitude,
      city.latitude,
      city.name
    );
    setWeather(findedWeather);
    if (searchRef && searchRef.current) searchRef.current.clearField();
  };
  const favLength = favCitiesList.data.length;
  if (!list)
    return (
      <div>
        <FavList
          setFavCities={setFavCitiesList}
          clickHandler={findAndSetWeather}
          len={favLength}
          favList={favCitiesList}
          alertActive={alertActive}
        />
      </div>
    );
  if (list.data.length === 0)
    return (
      <div>
        <FavList
          setFavCities={setFavCitiesList}
          clickHandler={findAndSetWeather}
          len={favLength}
          favList={favCitiesList}
          alertActive={alertActive}
        />
        <h2>No cities found</h2>
      </div>
    );

  return (
    <div>
      <FavList
        setFavCities={setFavCitiesList}
        clickHandler={findAndSetWeather}
        len={favLength}
        favList={favCitiesList}
        alertActive={alertActive}
      />
      <ul>
        {list.data.map(listElement => (
          <CityListElement
            setFavCities={setFavCitiesList}
            clickHandler={findAndSetWeather}
            city={listElement}
            favList={favCitiesList}
            favLen={favLength}
            toggleAlert={toggleAlert}
          />
        ))}
      </ul>
    </div>
  );
};
export default CitiesListElement;
