export const findGeolocation = (map: any, maps: any) => {
  const infoWindow = new maps.InfoWindow;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const { latitude, longitude } = position.coords;
      const bounds = new maps.LatLngBounds();
      const latLngBounds = 0.001348;
      // const latLngBounds = 0.002200;
      bounds.ja = { g: longitude - latLngBounds, h: longitude + latLngBounds };
      bounds.na = { g: latitude - latLngBounds, h: latitude + latLngBounds };
      // infoWindow.setPosition({lat: latitude, lng: longitude});
      // infoWindow.setContent('Location found.');
      // infoWindow.open(map);
      map.setCenter({lat: latitude, lng: longitude});
      map.setZoom(16);
      // reverseGeocoding(map, {lat: latitude, lng: longitude});
      // map.fitBounds(bounds);
      // getBoards();
    }, function() {
      handleLocationError(true, infoWindow, map);
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map);
  }
};

const handleLocationError = (browserHasGeolocation: boolean, infoWindow: any, map: any) => {
  infoWindow.setPosition(map.getCenter());
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
};