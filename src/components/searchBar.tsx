import React, { useEffect } from "react";
import { useDelayField } from "../hooks";

const SearchBar = () => {
  const [data, handleData, delayedValue] = useDelayField(2000);
  useEffect(() => {
    console.log(delayedValue);
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
