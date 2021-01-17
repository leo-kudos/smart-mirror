/* eslint-disable max-statements */
import React, { useState, useEffect } from 'react';
import '../App.css';
import { getWeatherData, getForecastData } from '../controllers/getWeatherData';
import WeatherIcons from '../constants/WeatherIcons';
import {
  WEATHER_ICON_DAY_COLOR, WEATHER_ICON_NIGHT_COLOR,
  WEATHER_CURRENT_UPDATE_INTERVAL, WEATHER_FORECAST_UPDATE_INTERVAL,
  WEATHER_LOCALSTORAGE_KEY, FORECAST_LOCALSTORAGE_KEY,
  WEATHER_UPDATE_INTERVAL_ONERROR,
} from '../config';
import ForecastItem from './ForecastItem';

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [todayForecastData, setTodayForecastData] = useState({});
  const [iconColor, setIconColor] = useState(WEATHER_ICON_DAY_COLOR);
  const [forecastItems, setforecastItems] = useState([]);
  const [error, setError] = useState(false);
  const [localWeatherData, setLocalWeatherData] = useState(JSON.parse(localStorage.getItem(WEATHER_LOCALSTORAGE_KEY)));
  const [localForecastData, setLocalForecastData] = useState(JSON.parse(localStorage.getItem(FORECAST_LOCALSTORAGE_KEY)));

  const [WtIconComponent, setWtIconComponent] = useState({
    slot0: WeatherIcons.loading
  });

  const updateLocalData = (data, key, setter) => {
    localStorage.setItem(key, JSON.stringify(data));
    setter(data);
  };

  const setTodayData = data => {
    setWeatherData(data);
    setIconColor(data.isDayTime ? WEATHER_ICON_DAY_COLOR : WEATHER_ICON_NIGHT_COLOR);
    setWtIconComponent({ slot0: WeatherIcons[data.icon] });
    updateLocalData(data, WEATHER_LOCALSTORAGE_KEY, setLocalWeatherData);
  };

  const setForecastData = data => {
    setTodayForecastData(data.forecast[0]);
    const forecastItemsBuffer = [];
    for (let lp = 1; lp <= 3; lp += 1) {
      forecastItemsBuffer.push(
        <ForecastItem
          itemData={data.forecast[lp]}
          key={lp}
        />
      );
    }
    setforecastItems(forecastItemsBuffer);
    updateLocalData(data, FORECAST_LOCALSTORAGE_KEY, setLocalForecastData);
  };

  const currentWeatherData = () => {
    getWeatherData()
      .then(result => {
        setTodayData(result);
        setTimeout(currentWeatherData, WEATHER_CURRENT_UPDATE_INTERVAL);
      })
      .catch(() => {
        if (localWeatherData) {
          setTodayData(localWeatherData);
          return;
        }
        setError(true);
        setTimeout(currentWeatherData, WEATHER_UPDATE_INTERVAL_ONERROR);
      });
  };

  const nextThreeDaysWeatherData = () => {
    getForecastData()
      .then(result => {
        setForecastData(result);
        setTimeout(nextThreeDaysWeatherData, WEATHER_FORECAST_UPDATE_INTERVAL);
      })
      .catch(() => {
        if (localForecastData) {
          setForecastData(localForecastData);
          return;
        }
        setError(true);
        setTimeout(nextThreeDaysWeatherData, WEATHER_UPDATE_INTERVAL_ONERROR);
      });
  };

  useEffect(() => {
    currentWeatherData();
    nextThreeDaysWeatherData();
  }, []);

  if (error) {
    return (
      <div className="weather-container">
        There was an error loading the weather data.
      </div>
    );
  }

  return (
    <div className="weather-container">
      <div className="current">
        <div className="body">
          <div className="icon-block">
            <WtIconComponent.slot0 size={150} color={iconColor} className="current-icon" />
          </div>
          <div className="now-block">
            <div className="now-temp">
              {weatherData.temp}°
            </div>
          </div>
        </div>
        <div className="description">
          <p>{weatherData.description} - Updated {weatherData.time}</p>
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
