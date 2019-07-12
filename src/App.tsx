import React, { useEffect } from 'react';
import './App.css';
import L from 'leaflet';

const App: React.FC = () => {
  let myMap: any;
  useEffect(() => {
    // create map
    myMap = L.map('map', {
      center: [51.505, -0.09],
      zoom: 13,
      layers: [
        L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYm9henJhbW90IiwiYSI6ImNqdWxpN29xbjExZnczeW5xZG81b3RsYWwifQ.SzkxgoG8ZgMtXFYTuSA1BA', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        }),
      ]
    });
  }, []);

  const handleClick = () => {
    const watchID = navigator.geolocation.watchPosition((position) => {
      console.log('handleClick', position.coords.latitude, position.coords.longitude);
      myMap.setView([position.coords.latitude, position.coords.longitude], 12);
      L.marker([position.coords.latitude, position.coords.longitude]).addTo(myMap);
    });

    // navigator.geolocation.clearWatch(watchID);
  };

  return (
    <div className="App">
      <div className="map" id="map"/>
      <button onClick={handleClick}>my location</button>
    </div>
  );
}

export default App;
