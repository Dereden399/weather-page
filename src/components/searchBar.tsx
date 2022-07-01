import React, { useEffect } from "react";
import { useDelayField } from "../hooks";
import { getCitiesList } from "../services/weatherService";
import { CitiesList } from "../types";

const SearchBar = ({
  setList,
}: {
  setList: React.Dispatch<React.SetStateAction<CitiesList | null>>;
}) => {
  const [data, handleData, delayedValue] = useDelayField(2000);
  useEffect(() => {
    const find = async () => {
      const list = await getCitiesList(delayedValue.replace(" ", "+"));
      setList(list);
    };
    if (delayedValue) void find();
  }, [delayedValue]);
  return (
    <input
      placeholder='Type city name here...'
      value={data}
      onChange={handleData}
    />
  );
};

export default SearchBar;
