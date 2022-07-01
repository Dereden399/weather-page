import React, { useEffect, useState } from "react";

export const useDelayField = (
  timeDelay: number = 1000
): [
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  string,
  () => void
] => {
  const [NowField, setNowField] = useState<string>("");
  const [delayedField, setDelayedField] = useState<string>("");
  useEffect(() => {
    const handler = setTimeout(() => setDelayedField(NowField), timeDelay);
    return () => clearTimeout(handler);
  }, [NowField, timeDelay]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNowField(e.target.value);
  };
  const clearField = () => {
    setNowField("");
    setDelayedField("");
  };
  return [NowField, handleChange, delayedField, clearField];
};
