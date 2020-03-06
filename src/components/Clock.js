import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/en-ca';
import { CLOCK_UPDATE_INTERVAL } from '../config';
import '../App.css';

const Clock = () => {
  const getFormattedDate = () => {
    const timeFormat = 'dddd,DD,MMM,HH:mm,YYYY';
    return moment().format(timeFormat).split(',');
  };

  const [time, setTime] = useState(getFormattedDate());

  useEffect(() => {
    const updateTime = () => {
      setTime(getFormattedDate());
      setTimeout(updateTime, CLOCK_UPDATE_INTERVAL);
    };
    updateTime();
  }, []);

  return (
    <div className="clock-container">
      <div className="time">{time[3]}</div>
      <div className="v-div"></div>
      <div className="day">
        <span>{time[0]}</span>
        <span>{time[1]}</span>
        <span>{time[2]}/{time[4]}</span>
      </div>
    </div>
  );
};

export default Clock;
