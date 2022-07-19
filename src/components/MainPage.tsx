import React from "react";
import IconImage from "../assets/WeatherIcon.png";
const MainPage = () => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-start'>
      <div
        className='bg-mainColor-200/70 rounded-2xl flex flex-col items-center justify-center p-1 h-[calc(100vh-4rem)] mt-4
      font-roboto font-light text-white text-xl md:text-3xl md:p-2 md:h-[calc(100vh-6rem)] lg:w-3/4 max-w-5xl lg:h-3/4'
      >
        <div className='flex flex-row items-center w-full'>
          <img
            src={IconImage}
            alt='icon'
            className='w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-[28rem] xl:h-[28rem]'
          />
          <p className='p-1 text-2xl font-bold text-center md:text-5xl w-full lg:hidden'>
            Weather Page project
          </p>
          <div className='hidden lg:flex lg:flex-col lg:h-full'>
            <p className='p-1 font-bold text-center text-5xl w-full'>
              Weather Page project
            </p>
            <p>
              A pretty simple but useful page, where you can see the weather in
              different cities all over the world. It uses tailwind Css for
              styling and cookies for storing favourite cities. Also the Context
              API is used.The weather information is provided by{" "}
              <a
                className='text-mainColor-100 font-medium'
                href='https://openweathermap.org/'
              >
                OpenWeatherMap
              </a>{" "}
              and cities list is provided by{" "}
              <a
                className='text-mainColor-100 font-medium'
                href='http://geodb-cities-api.wirefreethought.com/'
              >
                GeoDB Cities Api
              </a>
            </p>
          </div>
        </div>
        <div className='flex flex-col justify-between h-full text-xl text-center text-white md:text-3xl w-full lg:justify-end'>
          <p className='lg:hidden'>
            A pretty simple but useful page, where you can see the weather in
            different cities all over the world. It uses tailwindCss for styling
            and cookies for storing favourite cities. Also the Context API is
            used. The weather information is provided by{" "}
            <a
              className='text-mainColor-100 font-medium'
              href='https://openweathermap.org/'
            >
              OpenWeatherMap
            </a>{" "}
            and cities list is provided by{" "}
            <a
              className='text-mainColor-100 font-medium'
              href='http://geodb-cities-api.wirefreethought.com/'
            >
              GeoDB Cities Api
            </a>
          </p>
          <span className='pb-4'>
            Type the city name in the search field above to see the weather
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
