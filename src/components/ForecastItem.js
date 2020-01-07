import React from 'react';
import WeatherIcons from '../constants/WeatherIcons';
import { WEATHER_ICON_DAY_COLOR, WEATHER_ICON_NIGHT_COLOR } from '../config';
import '../App.css';

const ForecastItem = ({ itemData, iconColor }) => {
  const ItemIcons = {
    dayIcon: WeatherIcons[itemData.day.icon],
    nightIcon: WeatherIcons[itemData.night.icon]
  };

  return (
    <div className="forecast-item">
      <div className="date">{itemData.date}</div>
      <div className="conditions-block">
        <div className="icon">
          <ItemIcons.dayIcon size={60} color={WEATHER_ICON_DAY_COLOR} className="day-icon" />
          <div className="min-max-block">
            <span>&#9650; {itemData.tempMax}°</span>
            <span>&#8767; {itemData.realFeelTempMax}°</span>
          </div>
        </div>
        <span>
          <WeatherIcons.rain size={28} color={WEATHER_ICON_DAY_COLOR} />
          <p>{itemData.day.rain.probability}% <small>({itemData.day.rain.amount}{itemData.day.rain.unit})</small></p>
        </span>
        <span>
          <WeatherIcons.snow size={28} color={WEATHER_ICON_DAY_COLOR} />
          <p>{itemData.day.snow.probability}% <small>({itemData.day.snow.amount}{itemData.day.snow.unit})</small></p>
        </span>
        <div className="icon">
          <ItemIcons.nightIcon size={60} color={WEATHER_ICON_NIGHT_COLOR} className="night-icon" />
          <div className="min-max-block">
            <span>&#9660; {itemData.tempMin}°</span>
            <span>&#8767; {itemData.realFeelTempMin}°</span>
          </div>
        </div>
        <span>
          <WeatherIcons.rain size={28} color={WEATHER_ICON_NIGHT_COLOR} />
          <p>{itemData.night.rain.probability}% <small>({itemData.night.rain.amount}{itemData.night.rain.unit})</small></p>
        </span>
        <span>
          <WeatherIcons.snow size={28} color={WEATHER_ICON_NIGHT_COLOR} />
          <p>{itemData.night.snow.probability}% <small>({itemData.night.snow.amount}{itemData.night.snow.unit})</small></p>
        </span>
      </div>
    </div>
  );
};

export default ForecastItem;
