import React, { useState } from "react";
import { getWeather } from "../services/weatherService";
import { CitiesList, City, SearchBarRefType, Theme } from "../types";
import { HiStar } from "react-icons/hi";
import { useStateValue } from "../state";
import { setSelectedCityWeather } from "../actionCreators";

const CityListElement = ({
  setFavCities,
  clickHandler,
  city,
  favLen,
  toggleAlert,
}: {
  setFavCities: (list: CitiesList) => void;
  clickHandler: (e: React.MouseEvent<HTMLElement>, city: City) => Promise<void>;
  city: City;
  favLen: number;
  toggleAlert: () => void;
}) => {
  const [{ favCitiesList }] = useStateValue();
  let isFavourite = favCitiesList.data.some(e => e.name === city.name) || false;
  const favHandler = () => {
    if (!isFavourite) {
      if (favLen > 8) {
        toggleAlert();
        return;
      }
      setFavCities({ data: favCitiesList.data.concat(city) });
      isFavourite = true;
      return;
    }
    setFavCities({
      data: favCitiesList.data.filter(x => x.name !== city.name),
    });
    isFavourite = false;
  };
  return (
    <li className='searchPanel'>
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
}: {
  setFavCities: (list: CitiesList) => void;
  clickHandler: (e: React.MouseEvent<HTMLElement>, city: City) => Promise<void>;
  city: City;
}) => {
  const [{ favCitiesList }] = useStateValue();
  const favHandler = () => {
    setFavCities({
      data: favCitiesList.data.filter(x => x.name !== city.name),
    });
  };
  return (
    <li className='searchPanel'>
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
  alertActive,
}: {
  setFavCities: (list: CitiesList) => void;
  clickHandler: (e: React.MouseEvent<HTMLElement>, city: City) => Promise<void>;
  len: number;
  alertActive: boolean;
}) => {
  const [{ favCitiesList }] = useStateValue();
  if (!len) return null;
  return (
    <>
      {alertActive ? (
        <p className='bg-red-800 border-red-600 border-2 text-xl rounded-3xl text-red-300 p-1 w-full text-center my-2'>
          You can save only 9 favourite cities
        </p>
      ) : null}
      <ul className='w-full flex flex-col gap-y-2'>
        {favCitiesList.data.map(el => (
          <FavCityElement
            setFavCities={setFavCities}
            clickHandler={clickHandler}
            city={el}
            key={el.id}
          />
        ))}
      </ul>
      <hr className='w-full max-w-5xl my-2 bg-mainColor-100' />
    </>
  );
};

const CitiesListElement = ({
  searchRef,
  setFavCitiesList,
  isVisible,
  changeTheme,
}: {
  searchRef: React.RefObject<SearchBarRefType>;
  setFavCitiesList: (list: CitiesList) => void;
  isVisible: boolean;
  changeTheme: (theme: Theme) => void;
}) => {
  const [alertActive, setAlertActive] = useState<boolean>(false);
  const [{ favCitiesList, findedCitiesList }, dispatch] = useStateValue();
  const toggleAlert = () => {
    window.localStorage.removeItem("alertTimer");
    setAlertActive(true);
    const tim = setTimeout(() => setAlertActive(false), 3000);
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
    dispatch(setSelectedCityWeather(findedWeather));
    if (
      findedWeather.weather[0].id <= 321 ||
      (findedWeather.weather[0].id >= 511 &&
        findedWeather.weather[0].id <= 781) ||
      findedWeather.weather[0].id >= 802 ||
      (findedWeather.weather[0].id === 801 &&
        findedWeather.weather[0].icon === "02n")
    ) {
      changeTheme(Theme.Rainy);
    } else {
      changeTheme(Theme.Sunny);
    }
    if (searchRef && searchRef.current) searchRef.current.clearField();
  };
  const favLength = favCitiesList.data.length;
  return (
    <div
      className={`absolute -top-[100vh] ${
        isVisible ? "top-0" : null
      } h-screen w-screen transition-all duration-300 ease-in-out bg-mainColor-700/60 backdrop-blur-lg p-1 md:p-2 lg:p-3 flex flex-col items-center`}
    >
      <div className='flex flex-col mt-12 md:mt-16 h-full items-center w-full lg:w-3/4 max-w-5xl text-white overflow-y-auto scrollbar'>
        <FavList
          setFavCities={setFavCitiesList}
          clickHandler={findAndSetWeather}
          len={favLength}
          alertActive={alertActive}
        />
        {!findedCitiesList ? null : findedCitiesList.data.length > 0 ? (
          <ul className='w-full flex flex-col h-full gap-y-2'>
            {findedCitiesList.data.map(listElement => (
              <CityListElement
                setFavCities={setFavCitiesList}
                clickHandler={findAndSetWeather}
                city={listElement}
                favLen={favLength}
                toggleAlert={toggleAlert}
                key={listElement.id}
              />
            ))}
          </ul>
        ) : (
          <h2 className='text-center my-2 text-xl font-roboto font-regular'>
            No cities found
          </h2>
        )}
      </div>
    </div>
  );
};
export default CitiesListElement;
