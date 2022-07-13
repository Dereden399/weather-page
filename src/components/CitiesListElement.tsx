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
    <li key={city.id} className='searchPanel'>
      <p onClick={e => clickHandler(e, city)} className='w-full text-center'>
        {city.name}
      </p>
      <button onClick={favHandler}>
        <HiStar
          className={`h-8 w-8 md:h-12 md:w-12 ${
            isFavourite
              ? "fill-yellow-300 active:fill-yellow-500"
              : "fill-gray-600 active:fill-gray-700"
          }`}
        />
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
    <li key={city.id} className='searchPanel'>
      <p onClick={e => clickHandler(e, city)} className='w-full text-center'>
        {city.name}
      </p>
      <button onClick={favHandler}>
        <HiStar className='h-8 w-8 md:h-12 md:w-12 fill-yellow-300 active:fill-yellow-500' />
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
      <ul className='w-full flex flex-col gap-y-2'>
        {favList.data.map(el => (
          <FavCityElement
            setFavCities={setFavCities}
            clickHandler={clickHandler}
            city={el}
            favList={favList}
          />
        ))}
      </ul>
      <hr className='w-full max-w-5xl my-2 bg-mainBlue-100' />
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
      city.name,
      city.country
    );
    setWeather(findedWeather);
    if (searchRef && searchRef.current) searchRef.current.clearField();
  };
  const favLength = favCitiesList.data.length;
  return (
    <div
      className={`absolute -top-[100vh] ${
        isVisible ? "top-0" : null
      } h-screen w-screen transition-all duration-300 ease-in-out bg-mainBlue-700/60 backdrop-blur-lg p-1 md:p-2 lg:p-3 flex flex-col items-center`}
    >
      <div className='flex flex-col mt-12 md:mt-16 h-full items-center w-full lg:w-3/4 max-w-5xl text-white overflow-y-auto scrollbar'>
        <FavList
          setFavCities={setFavCitiesList}
          clickHandler={findAndSetWeather}
          len={favLength}
          favList={favCitiesList}
          alertActive={alertActive}
        />
        {!list ? null : list.data.length > 0 ? (
          <ul className='w-full flex flex-col h-full gap-y-2'>
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
        ) : (
          <h2>No cities found</h2>
        )}
      </div>
    </div>
  );
};
export default CitiesListElement;
