import React from "react";
import { getWeather } from "../services/weatherService";
import { CitiesList, City, SearchBarRefType, WeatherData } from "../types";

const CitiesListElement = ({
  list,
  setWeather,
  searchRef,
  isVisible,
  toggleVisible,
}: {
  list: CitiesList | null;
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>;
  searchRef: React.RefObject<SearchBarRefType>;
  isVisible: boolean;
  toggleVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  if (!list) return null;
  if (list.data.length === 0) return <h1>No cities found</h1>;
  const findAndSetWeather = async (
    e: React.MouseEvent<HTMLLIElement>,
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
        {list.data.map(element => (
          <li key={element.id} onClick={e => findAndSetWeather(e, element)}>
            {element.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitiesListElement;
