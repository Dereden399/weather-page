import React from "react";
import { getWeather } from "../services/weatherService";
import { CitiesList, City, WeatherData } from "../types";

const CitiesListElement = ({
  list,
  setWeather,
}: {
  list: CitiesList | null;
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>;
}) => {
  if (!list) return null;
  if (list.data.length === 0) return null;
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
