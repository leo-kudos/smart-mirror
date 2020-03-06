import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/en-ca';
import {
  CACHE_WEATHER_DATA,
  WEATHER_API_URL,
  WEATHER_API_FORECAST_URL,
  WEATHER_API_KEY,
  WEATHER_LOCATION_KEY,
  WEATHER_DATA_LANG,
  WEATHER_CITY,
  WEATHER_COUNTRY,
  WEATHER_UNIT_TYPE
} from '../config';

const useCache = CACHE_WEATHER_DATA ? '' : `&timestamp=${moment().unix()}`;

const formatForecastData = item => ({
  tempMin: (item.Temperature.Minimum.Value || 0).toFixed(0),
  tempMax: (item.Temperature.Maximum.Value || 0).toFixed(0),
  realFeelTempMin: (item.RealFeelTemperature.Minimum.Value || 0).toFixed(0),
  realFeelTempMax: (item.RealFeelTemperature.Maximum.Value || 0).toFixed(0),
  date: moment(item.EpochDate * 1000).format('ddd, DD'),
  sunRise: moment(item.Sun.EpochRise * 1000).format('HH:mm'),
  sunSet: moment(item.Sun.EpochSet * 1000).format('HH:mm'),
  day: {
    icon: item.Day.Icon,
    text: item.Day.IconPhrase,
    wind: {
      amount: (item.Day.Wind.Speed.Value || 0).toFixed(0),
      unit: item.Day.Wind.Speed.Unit
    },
    clouds: (item.Day.CloudCover || 0).toFixed(0),
    rain: {
      probability: (item.Day.RainProbability || 0).toFixed(0),
      amount: (item.Day.Rain.Value || 0).toFixed(0),
      unit: item.Day.Rain.Unit
    },
    snow: {
      probability: (item.Day.SnowProbability || 0).toFixed(0),
      amount: (item.Day.Snow.Value || 0).toFixed(0),
      unit: item.Day.Snow.Unit
    }
  },
  night: {
    icon: item.Night.Icon,
    text: item.Night.IconPhrase,
    wind: {
      amount: (item.Night.Wind.Speed.Value || 0).toFixed(0),
      unit: item.Night.Wind.Speed.Unit
    },
    clouds: (item.Night.CloudCover || 0).toFixed(0),
    rain: {
      probability: (item.Night.RainProbability || 0).toFixed(0),
      amount: (item.Night.Rain.Value || 0).toFixed(0),
      unit: item.Night.Rain.Unit
    },
    snow: {
      probability: (item.Night.SnowProbability || 0).toFixed(0),
      amount: (item.Night.Snow.Value || 0).toFixed(0),
      unit: item.Night.Snow.Unit
    }
  }
});

export const getWeatherData = () => axios
  .get(`${WEATHER_API_URL}/${WEATHER_LOCATION_KEY}?apikey=${WEATHER_API_KEY}&language=${WEATHER_DATA_LANG}&details=true${useCache}`)
  .then(({ data }) => ({
      temp: (data[0].Temperature[WEATHER_UNIT_TYPE].Value || 0).toFixed(0),
      tempUnit: data[0].Temperature[WEATHER_UNIT_TYPE].Unit,
      tempSummary: {
        sixHoursMin: (data[0].TemperatureSummary.Past6HourRange.Minimum[WEATHER_UNIT_TYPE].Value || 0).toFixed(0),
        sixHoursMax: (data[0].TemperatureSummary.Past6HourRange.Maximum[WEATHER_UNIT_TYPE].Value || 0).toFixed(0),
        twelveHoursMin: (data[0].TemperatureSummary.Past12HourRange.Minimum[WEATHER_UNIT_TYPE].Value || 0).toFixed(0),
        twelveHoursMax: (data[0].TemperatureSummary.Past12HourRange.Maximum[WEATHER_UNIT_TYPE].Value || 0).toFixed(0),
        twentyfourHoursMin: (data[0].TemperatureSummary.Past24HourRange.Minimum[WEATHER_UNIT_TYPE].Value || 0).toFixed(0),
        twentyfourHoursMax: (data[0].TemperatureSummary.Past24HourRange.Maximum[WEATHER_UNIT_TYPE].Value || 0).toFixed(0)
      },
      realFeelTemp: (data[0].RealFeelTemperature[WEATHER_UNIT_TYPE].Value || 0).toFixed(0),
      city: WEATHER_CITY,
      country: WEATHER_COUNTRY,
      humidity: data[0].RelativeHumidity || 0,
      wind: (data[0].Wind.Speed[WEATHER_UNIT_TYPE].Value || 0).toFixed(0),
      windUnit: data[0].Wind.Speed[WEATHER_UNIT_TYPE].Unit,
      clouds: data[0].CloudCover || 0,
      description: data[0].WeatherText,
      icon: data[0].WeatherIcon || 'default',
      isDayTime: data[0].IsDayTime,
      time: moment(data[0].EpochTime * 1000).format('HH:mm'),
      error: false
    }))
  .catch(error => ({
    error
  }));

export const getForecastData = () => axios
  .get(`${WEATHER_API_FORECAST_URL}/${WEATHER_LOCATION_KEY}?apikey=${WEATHER_API_KEY}&language=${WEATHER_DATA_LANG}&details=true&metric=${WEATHER_UNIT_TYPE === 'Metric'}${useCache}`)
  .then(({ data }) => ({
        error: false,
        forecast: data.DailyForecasts.map(item => formatForecastData(item))
      }))
  .catch(error => ({
    error
  }));
