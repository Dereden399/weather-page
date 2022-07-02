import React from "react";

const MainPage = () => {
  return (
    <div>
      <h1>Weather Page project</h1>
      <i>
        A pretty smple but useful page, where you can see the weather in
        different cities all over the world. It uses tailwindCss for styling and
        cookies for storing favourite cities. The weather information is
        provided by <a href='https://openweathermap.org/'>OpenWeatherMap</a> and
        cities list is provided by{" "}
        <a href='http://geodb-cities-api.wirefreethought.com/'>
          GeoDB Cities Api
        </a>
      </i>
      <p>Type the city name in the search field above to see the weather</p>
    </div>
  );
};

export default MainPage;
