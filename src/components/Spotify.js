import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import '../App.css';

const Spotify = () => (
  <div className="spotify-item">
    <SpotifyPlayer
      token="BQAludshmcmPUefu3tTrMmnID7ZumCl4xn-vqAVtTfXuELy5cl3hZytq3LZcbifYqWI-ZEc45-ihGRaGEh6pLDPNcV1vfBBq-O-IxzJANRSdjTu0GG8YDr93UYyivLR5WBXnahCM2_7J3shZQxS4F_jMmRS2nqydGqp2G1j3bEhPOrmwn9-EbRppZjNE"
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
