import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/en-ca';
import '../App.css';

const GoogleCalendar = () => {

  const getEvents = () => {
    let that = this;
    const start = () => {
      gapi.client.init({
        'apiKey': 'AIzaSyD_VYxqe-fdkrjSZQo_DAQ75cc7dpuflX8',
        'orderBy': 'updated'
      }).then(function() {
        return gapi.client.request({
          path: `https://www.googleapis.com/calendar/v3/calendars/leleosk8zo%40gmail.com/events?maxResults=11&orderBy=updated&timeMin=${moment().toISOString()}&timeMax=${moment().endOf("day").toISOString()}`
      }).then( (response) => {
          console.log('calendar response', response);
      }, function(reason) {
        console.log(reason);
      });
    }
    gapi.load('client', start)
  }

  getEvents();

  return (
    <div className="calendar-container"></div>
  );

};

export default GoogleCalendar;
