import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useDelayField } from "../hooks";
import { getCitiesList } from "../services/weatherService";
import { CitiesList, SearchBarRefType, WeatherData } from "../types";
import { FiHome } from "react-icons/fi";

type SearchBarProps = {
  setList: React.Dispatch<React.SetStateAction<CitiesList | null>>;
  toggleVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherData | null>>;
};

const CloseButton = ({ closeFunction }: { closeFunction: () => void }) => {
  return <button onClick={closeFunction}>close</button>;
};

const MainPageButton = ({
  clearFunction,
  setWeather,
}: {
  clearFunction: () => void;
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>;
}) => {
  return (
    <button
      onClick={() => {
        clearFunction();
        setWeather(null);
      }}
    >
      <FiHome />
    </button>
  );
};

const SearchBar = forwardRef(
  (
    { setList, toggleVisible, setWeatherData }: SearchBarProps,
    ref: Ref<SearchBarRefType>
  ) => {
    const [data, handleData, delayedValue, clear] = useDelayField(2000);
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
    useEffect(() => {
      const find = async () => {
        const list = await getCitiesList(delayedValue.replace(" ", "+"));
        setList(list);
      };
      if (delayedValue) void find();
    }, [delayedValue, setList]);

    const clearField = () => {
      clear();
      setIsSearchActive(false);
      setList(null);
      toggleVisible(false);
    };

    useImperativeHandle(ref, () => {
      return {
        clearField,
      };
    });

    return (
      <div>
        {isSearchActive ? <CloseButton closeFunction={clearField} /> : null}
        <input
          placeholder='Type city name here...'
          value={data}
          onChange={e => {
            toggleVisible(true);
            handleData(e);
          }}
          onClick={e => setIsSearchActive(true)}
        />
        <MainPageButton
          clearFunction={clearField}
          setWeather={setWeatherData}
        />
      </div>
    );
  }
);

export default SearchBar;
