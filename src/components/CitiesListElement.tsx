import React from "react";
import { getWeather } from "../services/weatherService";
import { CitiesList, City, SearchBarRefType, WeatherData } from "../types";
import { HiStar } from "react-icons/hi";

const CityListElement = ({
  setFavCities,
  clickHandler,
  city,
  favList,
}: {
  setFavCities: React.Dispatch<React.SetStateAction<CitiesList>>;
  clickHandler: (e: React.MouseEvent<HTMLElement>, city: City) => Promise<void>;
  city: City;
  favList: CitiesList;
}) => {
  let isFavourite = favList.data.some(e => e.name === city.name) || false;
  const favHandler = () => {
    if (!isFavourite) {
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

const CitiesListElement = ({
  list,
  setWeather,
  searchRef,
  favCitiesList,
  setFavCitiesList,
}: {
  list: CitiesList | null;
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>;
  searchRef: React.RefObject<SearchBarRefType>;
  favCitiesList: CitiesList;
  setFavCitiesList: React.Dispatch<React.SetStateAction<CitiesList>>;
}) => {
  if (!list) return null;
  if (list.data.length === 0) return <h1>No cities found</h1>;
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
  return (
    <div>
      <ul>
        {list.data.map(listElement => (
          <CityListElement
            setFavCities={setFavCitiesList}
            clickHandler={findAndSetWeather}
            city={listElement}
            favList={favCitiesList}
          />
        ))}
      </ul>
    </div>
  );
};

export default CitiesListElement;
