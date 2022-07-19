import React, { forwardRef, Ref, useEffect, useImperativeHandle } from "react";
import { useDelayField } from "../hooks";
import { getCitiesList } from "../services/weatherService";
import { SearchBarRefType } from "../types";
import { useStateValue } from "../state";
import { setFindedCities, setSelectedCityWeather } from "../actionCreators";

type SearchBarProps = {
  toggleActive: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean;
};

const CloseButton = ({
  closeFunction,
  isActive,
}: {
  closeFunction: () => void;
  isActive: boolean;
}) => {
  return (
    <button
      onClick={closeFunction}
      className={`transition-all duration-150 ease-in-out ${
        isActive ? "scale-100" : "scale-0"
      }`}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-8 w-8 stroke-mainBlue-200 md:h-12 md:w-12'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={1}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6 18L18 6M6 6l12 12'
        />
        <circle cx='0.75rem' cy='0.75rem' r='0.7rem' />
      </svg>
    </button>
  );
};

const MainPageButton = ({ clearFunction }: { clearFunction: () => void }) => {
  const [, dispatch] = useStateValue();
  return (
    <button
      className='hover:scale-105 transition-transform duration-150'
      onClick={() => {
        clearFunction();
        dispatch(setSelectedCityWeather(null));
      }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-8 w-8 stroke-mainBlue-200 md:h-12 md:w-12'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={1}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
        />
        <circle cx='0.75rem' cy='0.75rem' r='0.7rem' />
      </svg>
    </button>
  );
};

const SearchBar = forwardRef(
  ({ toggleActive, isActive }: SearchBarProps, ref: Ref<SearchBarRefType>) => {
    const [data, handleData, delayedValue, clear] = useDelayField(2000);
    const [, dispatch] = useStateValue();
    useEffect(() => {
      const find = async () => {
        const list = await getCitiesList(delayedValue.replace(" ", "+"));
        dispatch(setFindedCities(list));
      };
      if (delayedValue) void find();
    }, [delayedValue, dispatch]);

    const clearField = () => {
      clear();
      toggleActive(false);
      dispatch(setFindedCities(null));
    };

    useImperativeHandle(ref, () => {
      return {
        clearField,
      };
    });

    return (
      <div className='flex flex-row justify-between w-full z-20'>
        <CloseButton closeFunction={clearField} isActive={isActive} />
        <input
          className='border-solid border-mainBlue-300 rounded-3xl border-2 bg-transparent
          text-center focus:outline-0 text-mainBlue-100 placeholder:text-mainBlue-100 w-3/4 h-8 md:h-12 md:text-2xl max-w-5xl'
          placeholder='Type city name here...'
          value={data}
          onChange={e => {
            toggleActive(true);
            handleData(e);
          }}
          onClick={e => toggleActive(true)}
        />
        <MainPageButton clearFunction={clearField} />
      </div>
    );
  }
);

export default SearchBar;
