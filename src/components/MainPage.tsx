import React from "react";
import IconImage from "../assets/WeatherIcon.png";
const MainPage = () => {
  return (
    <div className='bg-mainBlue-200/70 rounded-2xl p-1 h-[calc(100vh-4rem)] mt-4 font-roboto font-light text-white flex flex-col md:p-2 md:h-[calc(100vh-6rem)]'>
      <div className='flex flex-row items-center'>
        <img src={IconImage} alt='icon' className='w-40 h-40 md:w-64 md:h-64' />
        <p className='text-3xl font-bold text-center md:text-5xl w-full'>
          Weather Page project
        </p>
      </div>
      <div className='flex flex-col justify-between h-full text-xl text-center text-white md:text-3xl'>
        <p>
          A pretty simple but useful page, where you can see the weather in
          different cities all over the world. It uses tailwindCss for styling
          and cookies for storing favourite cities. The weather information is
          provided by{" "}
          <a
            className='text-mainBlue-100 font-medium'
            href='https://openweathermap.org/'
          >
            OpenWeatherMap
          </a>{" "}
          and cities list is provided by{" "}
          <a
            className='text-mainBlue-100 font-medium'
            href='http://geodb-cities-api.wirefreethought.com/'
          >
            GeoDB Cities Api
          </a>
        </p>
        <p className='mb-4'>
          Type the city name in the search field above to see the weather
        </p>
      </div>
    </div>
  );
};

export default MainPage;
