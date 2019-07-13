import React, { SyntheticEvent, useEffect, useState } from 'react';
import './App.css';
import L from 'leaflet';

const App: React.FC = () => {
  const [search, setSearch] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [myMap, setMyMap] = useState();

  // let myMap: any;

  useEffect(() => {
    // create map
    const map = L.map('map', {
      center: [51.505, -0.09],
      zoom: 13,
      layers: [
        L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYm9henJhbW90IiwiYSI6ImNqdWxpN29xbjExZnczeW5xZG81b3RsYWwifQ.SzkxgoG8ZgMtXFYTuSA1BA', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        }),
      ]
    });
    map.addEventListener('click', (e: any) => {
      console.log('e', e);
      console.log('Lat', e.latlng.lat);
      console.log('Lon', e.latlng.lng);
      map.setView([e.latlng.lat, e.latlng.lng], 16);
    });
    setMyMap(map);
  }, []);

  const handleClick = () => {
    const watchID = navigator.geolocation.watchPosition((position) => {
      console.log('handleClick', position.coords.latitude, position.coords.longitude);
      myMap.setView([position.coords.latitude, position.coords.longitude], 12);
      L.marker([position.coords.latitude, position.coords.longitude]).addTo(myMap);
    });

    // navigator.geolocation.clearWatch(watchID);
  };

  const handleChange = (event: SyntheticEvent) => {
    const value = (event.target as HTMLInputElement).value;
    setSearch(value);
    setButtonEnabled(value.length > 0)
  };

  const handleSearch = () => {
    console.log(search);
    if (buttonEnabled) {
      // fetch(`https://nominatim.openstreetmap.org/?q=${search}`)
      // fetch(`https://nominatim.openstreetmap.org/?format=json&addressdetails=1&q=bakery+in+berlin+wedding&format=json&limit=1`)
      fetch(`https://nominatim.openstreetmap.org/?format=json&addressdetails=1&q=${search}&format=json&limit=1`)
        .then(res => res.json())
        .then(myJson => {
          console.log(myJson);
          console.log(myJson[0]);
          let lat = +myJson[0].lat;
          let lon = +myJson[0].lon;
          console.log('myMap', myMap);
          myMap.setView([lat, lon], 12);
        }).catch((e) => {
          console.error('Location Fetch failed', e)
      });
    }
    setSearch('');
    setButtonEnabled(false);
  };

  return (
    <div className="App">
      <input type="text" value={search} onChange={handleChange}/>
      <button onClick={handleSearch} disabled={!buttonEnabled}>Search</button>
      <div className="map" id="map"/>
      <button onClick={handleClick}>my location</button>
    </div>
  );
}

export default App;
