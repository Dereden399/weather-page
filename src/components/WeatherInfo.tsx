import React from "react";
import { WeatherData } from "../types";
import { IoIosWater } from "react-icons/io";
import { FiWind, FiCloud } from "react-icons/fi";
import { WiSunrise, WiSunset } from "react-icons/wi";

const WeatherInfo = ({ data }: { data: WeatherData }) => {
  const timeOfCalc = new Date(data.dt);
  const sunrise = new Date(data.sys.sunrise);
  const sunset = new Date(data.sys.sunset);
  return (
    <div className='h-full w-full flex flex-col items-center justify-start'>
      <div
        className='bg-mainBlue-500/80 rounded-2xl flex flex-col items-center justify-start h-[calc(100vh-4rem)] w-full mt-4
      font-roboto font-light text-white text-xl md:text-3xl md:h-[calc(100vh-6rem)] lg:w-3/4 max-w-5xl lg:h-3/4 lg:mt-0'
      >
        <div className='flex flex-row items-center justify-between w-full p-1 md:p-2 h-auto'>
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
            alt={data.weather[0].description}
            className='h-32 w-32 md:h-52 md:w-52'
          />
          <div className='flex flex-col justify-center w-full'>
            <h1 className='md:text-4xl'>{data.name}</h1>
            <p className='text-sm text-mainBlue-200 md:text-2xl'>
              {data.sys.country}
            </p>
          </div>
          <p className='mr-1 font-bold md:text-3xl'>
            {timeOfCalc.getHours()}:{timeOfCalc.getMinutes()}
          </p>
        </div>
        <div className='h-full max-h-full w-full flex flex-col justify-start bg-mainBlue-300/80 rounded-b-2xl p-3 md:p-5 overflow-hidden'>
          <div className='flex flex-row justify-start items-center pl-2'>
            <p className='font-bold text-4xl md:text-8xl'>
              {Math.floor(data.main.temp)}°C
            </p>
            <div className='flex flex-col w-full justify-start ml-3'>
              <h3 className='font-bold text-3xl md:text-5xl'>
                {data.weather[0].main}
              </h3>
              <i className='text-mainBlue-100 text-2xl md:text-4xl'>
                {data.weather[0].description}
              </i>
            </div>
          </div>
          <p className='text-lg text-mainBlue-100 md:text-4xl'>
            Feels like {Math.floor(data.main.feels_like)}°C
          </p>
          <p className='text-lg text-mainBlue-100 font-bold md:text-4xl'>
            From {Math.floor(data.main.temp_min)}°C to{" "}
            {Math.floor(data.main.temp_max)}°C in this region
          </p>
          <div className='h-full w-full flex flex-col justify-start overflow-y-auto scrollbar'>
            <div className='h-auto w-full grid grid-cols-2 grid-rows-5 items-center gap-x-1 gap-y-2 md:grid-cols-6 md:grid-rows-3 md:h-full md:my-12 md:gap-x-4 md:gap-y-10'>
              <div className='weatherPanel md:col-span-2'>
                <FiCloud className='h-16 w-16 fill-gray-200 stroke-gray-200 md:h-[4.5rem] md:w-[4.5rem]' />
                <p className='text-center grow md:text-3xl'>
                  {data.clouds.all}%
                </p>
              </div>
              <div className='weatherPanel md:col-span-2'>
                <IoIosWater className='h-16 w-16 fill-mainBlue-800 md:h-[4.5rem] md:w-[4.5rem]' />
                <p className='text-center grow md:text-2xl'>
                  {data.main.humidity}%
                </p>
              </div>
              <div className='weatherPanel md:col-span-2'>
                <FiWind className='h-16 w-16 md:h-[4.5rem] md:w-[4.5rem]' />
                <div className='flex flex-col justify-center grow text-base text-start md:text-2xl'>
                  <p>{data.wind.speed} m/s</p>
                  <p>{data.wind.deg}°</p>
                </div>
              </div>
              <div className='weatherPanel text-sm md:col-span-3 md:text-2xl'>
                <p>Visibility:</p>
                <p>{Math.floor(data.visibility / 100) / 10}km</p>
              </div>
              <div className='weatherPanel col-span-2 md:col-span-3 md:text-2xl'>
                <p>Pressure:</p>
                <p>{data.main.pressure} hPa</p>
              </div>
              <div className='weatherPanel col-span-2 justify-start md:col-span-3'>
                <WiSunrise className='h-16 w-16 fill-mainBlue-800 md:h-[4.5rem] md:w-[4.5rem]' />
                <div className='flex flex-col items-start ml-2 md:text-2xl'>
                  <p className='text-2xl md:text-3xl'>Sunrise</p>
                  <p>
                    {sunrise.getHours()}:{sunrise.getMinutes()}
                  </p>
                </div>
              </div>
              <div className='weatherPanel col-span-2 justify-start md:col-span-3'>
                <WiSunset className='h-16 w-16 fill-mainBlue-800 md:h-[4.5rem] md:w-[4.5rem]' />
                <div className='flex flex-col items-start ml-2 md:text-2xl'>
                  <p className='text-2xl md:text-3xl'>Sunset</p>
                  <p>
                    {sunset.getHours()}:{sunset.getMinutes()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
