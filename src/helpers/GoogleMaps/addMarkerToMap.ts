export const addMarkerToMap = (place: any, map: any, maps: any) => {
  return new maps.Marker({
    map,
    // icon: icon,
    title: place.name,
    // position: place.geometry.location
    position: place.location,
  });
};
