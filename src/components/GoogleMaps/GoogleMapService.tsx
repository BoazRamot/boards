import React, {useCallback, useEffect, useRef, useState} from "react";
import {GoogleMap, Marker} from "@react-google-maps/api";
import SearchBox from "./SearchBox";

declare global {
  interface Window { google: any; }
}

window.google = window.google || {};

interface IProps {}

const GoogleMapService: React.FC<IProps> = ({  }) => {
  const [lat, setLat] = useState(32.109333);
  const [lng, setLng] = useState(34.855499);
  const [zoom, setZoom] = useState(11);
  // const [marker, setMarker] = useState();
  const searchBoxRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {}, []);

  const onLoad = useCallback(
    function onLoad(map: any) {
      map.setOptions({
        disableDefaultUI: true
      });
      if (map) {
        findGeolocation(map)
      }
    }, []
  );

  const onBoundsChanged = useCallback(
    function onBoundsChanged() {
      const map = (mapRef.current as any).state.map;
      (searchBoxRef.current as any).state.searchBox.setBounds(map.getBounds())
    }, []
  );

  const findGeolocation = (map: any) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const { latitude, longitude } = position.coords;
        const bounds = new window.google.maps.LatLngBounds();
        bounds.ja = { g: longitude - 0.001348, h: longitude + 0.001348 };
        bounds.na = { g: latitude - 0.001348, h: latitude + 0.001348 };
        const infoWindow = new window.google.maps.InfoWindow;
        infoWindow.setPosition({lat: latitude, lng: longitude});
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter({lat: latitude, lng: longitude});
        // reverseGeocoding({lat, lng})
        map.fitBounds(bounds);
      }, function() {});
    } else {
      // Browser doesn't support Geolocation
    }
  };

  const reverseGeocoding = (latLng: any) => {
    const map = (mapRef.current as any).state.map;
    const geocoder = new window.google.maps.Geocoder;
    geocoder.geocode({'location': latLng}, function(results: any, status: any) {
      if (status === 'OK') {
        console.log(results)
        if (results[0]) {
          const infoWindow = new window.google.maps.InfoWindow;
          infoWindow.setPosition(latLng);
          infoWindow.setContent('Location found.');
          infoWindow.open(map);
          map.setCenter(latLng);
          map.fitBounds(results[0].geometry.viewport);
        } else {
          // window.alert('No results found');
        }
      } else {
        // window.alert('Geocoder failed due to: ' + status);
      }
    });
  };


  const handleClick = (e: any) => {
    const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    // reverseGeocoding(latLng)
  };

  const handleSearchBox = () => {
    const places = (searchBoxRef.current as any).state.searchBox.getPlaces();
    console.log('places', places)
    if (places.length === 0) {
      return;
    }
    places.forEach(function(place: any) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      const icon = {
        url: place.icon,
        size: new window.google.maps.Size(71, 71),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(25, 25)
      };
      const { location, viewport } = place.geometry;
      if (location) {
        const map = (mapRef.current as any).state.map;
        new window.google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        });
        map.fitBounds(viewport);
      }
    });
  };

  return (
    <GoogleMap
      id="map"
      ref={mapRef}
      zoom={zoom}
      center={{lat, lng}}
      mapContainerStyle={{
        display: "flex",
        flex: 1,
        height: `100vh`
      }}
      onClick={e => handleClick(e)}
      onLoad={onLoad}
      onBoundsChanged={onBoundsChanged}
    >
      {console.log("Latitude and longitude:", {lat, lng})}
      <SearchBox handleSearchBox={handleSearchBox} searchBoxRef={searchBoxRef}/>
    </GoogleMap>
  );
};

export default GoogleMapService;
