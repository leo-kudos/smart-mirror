import React, { useState, useEffect } from 'react';
import '../App.css';
import { getWeatherData, getForecastData } from '../controllers/getWeatherData';
import WeatherIcons from '../constants/WeatherIcons';
import { WEATHER_ICON_DAY_COLOR, WEATHER_ICON_NIGHT_COLOR, WEATHER_CURRENT_UPDATE_INTERVAL, WEATHER_FORECAST_UPDATE_INTERVAL } from '../config';
import ForecastItem from './ForecastItem';

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [todayForecastData, setTodayForecastData] = useState({});
  const [iconColor, setIconColor] = useState(WEATHER_ICON_DAY_COLOR);
  const [forecastItems, setforecastItems] = useState([]);

  const [WtIconComponent, setWtIconComponent] = useState({
    slot0: WeatherIcons.loading,
    slot1: WeatherIcons.loading,
    slot2: WeatherIcons.loading,
    slot3: WeatherIcons.loading
  });

  useEffect(() => {

    const currentWeatherData = () => {
      getWeatherData()
      .then(result => {
        console.log('getWeatherData', result);
        setWeatherData(result);
        setIconColor(result.isDayTime ? WEATHER_ICON_DAY_COLOR : WEATHER_ICON_NIGHT_COLOR);
        setWtIconComponent({ slot0: WeatherIcons[result.icon] });
      });
      setTimeout(currentWeatherData, WEATHER_CURRENT_UPDATE_INTERVAL);
    };

    const nextThreeDaysWeatherData = () => {
      getForecastData()
      .then(result => {
        console.log('gettodayForecastData', result);
        setTodayForecastData(result.forecast[0]);
        const forecastItemsBuffer = [];
        for (let lp = 1; lp <= 3; lp++) {
          forecastItemsBuffer.push(
            <ForecastItem
              itemData={result.forecast[lp]}
              key={lp}
            />
          );
        }
        setforecastItems(forecastItemsBuffer);
      });
      setTimeout(nextThreeDaysWeatherData, WEATHER_FORECAST_UPDATE_INTERVAL);
    };

    currentWeatherData();
    nextThreeDaysWeatherData();

  }, []);

  return (
    <div className="weather-container">
      <div className="current">
        <div className="body">
          <div className="icon-block">
            <WtIconComponent.slot0 size={150} color={iconColor} className="current-icon" />
          </div>
          <div className="now-block">
            <div className="city-update">
              <p>{weatherData.city}, {weatherData.country} @ {weatherData.time}</p>
            </div>
            <div className="now-temp">
              {weatherData.temp}°
            </div>
          </div>
        </div>
        <div className="description">
          <p>{weatherData.description}</p>
        </div>
        <div className="now-min-max">
          <span><b>Real</b> {weatherData.realFeelTemp}°</span>
          <span><b>High</b> {todayForecastData.tempMax}°</span>
          <span><b>Low</b> {todayForecastData.tempMin}°</span>
        </div>
        <div className="footer">
          <span>
            <WeatherIcons.clouds size={32} color={iconColor} />
            <p>{weatherData.clouds}%</p>
          </span>
          <span>
            <WeatherIcons.humidity size={46} color={iconColor} className="humidity-icon" />
            <p>{weatherData.humidity}%</p>
          </span>
          <span>
            <WeatherIcons.wind size={32} color={iconColor} />
            <p>{weatherData.wind}{weatherData.windUnit}</p>
          </span>
        </div>
      </div>
      <div className="forecast">
        {forecastItems}
      </div>
    </div>
  );
};

export default Weather;
