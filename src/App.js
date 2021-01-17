import React from 'react';
import './App.css';
import Clock from './components/Clock';
import Weather from './components/Weather';
// import GoogleCalendar from './components/GoogleCalendar';
// import Animation from './components/Animation';
import Spotify from './components/Spotify';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Clock />
        <Weather />
      </header>
    </div>
  );
};

export default App;
