export const addMarkerToMap = (place: any, map: any, maps: any) => {
  const marker = new maps.Marker({
    map: map,
    // icon: icon,
    title: place.name,
    // position: place.geometry.location
    position: place.location
  });
  return marker;
};