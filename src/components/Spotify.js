import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import '../App.css';

const Spotify = () => (
  <div className="spotify-item">
    <SpotifyPlayer
      token="BQBCz2H_Kpj0Th7PjfNjCH36tIXJqHCCy00tP-4HWPw5YG2rsstL4aXyBfWrg-mr36zYEMfyGuMGanWQsgvxmytFK_DT1Ysx0lDvtcQCLCjLtpxlqwBlEhmSjlSeHVnF4LJUwNOQ2-jTe3nc9XxrBGpG4jIwl8Xo4V4kd3jvA1ffGhhasiQRkC32y6xv"
      uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
      styles={{
        bgColor: '#fff',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#fff',
        savedColor: '#fff',
        trackArtistColor: '#fff',
        trackNameColor: '#fff'
      }}
    />;
  </div>
);

export default Spotify;
