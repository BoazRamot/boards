import {addMarkerToMap} from "./addMarkerToMap";

export const autocompleteInit = (addPlaceListener: any, map: any, autocompleteBoxRef: any, maps: any, marker: any, handleAutocompleteInputDialogOpen: any, updateLocation: any, setAutocompleteInput: any) => {
  const input = (autocompleteBoxRef.current as any).querySelector('input');
  const autocompleteInput = new maps.places.Autocomplete(input);
  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocompleteInput.bindTo('bounds', map);
  autocompleteInput.setFields(['address_components', 'geometry', 'icon', 'name']);
  // if (placeListener) {
  //
  // } else {
  //   const placeListener = (autocompleteInput as any).addListener('place_changed',
  //     () => {placeChanged(maps, map, autocompleteInput, marker, handleAutocompleteInputDialogOpen, updateLocation, setAutocompleteInput)});
  //   addPlaceListener(placeListener);
  // }

  const placeListener = (autocompleteInput as any).addListener('place_changed', () => {
    console.log('place_changed')
    console.log('drawerOption.marker placeListener', marker)
    if (marker.length !== 0) {
      console.log('drawerOption.marker[0].setMap(null)')
      console.log('drawerOption.marker[0]',marker[0])
      // drawerOption.marker.map((marker: any) => {
      //   marker.setMap(null);
      // });
      marker[0].setMap(null);
    }
    let newMarker;
    const place = autocompleteInput.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      console.log("No details available for input: '" + place.name + "'");
      handleAutocompleteInputDialogOpen();
      return;
    }

    const { location, viewport } = place.geometry;
    const name = place.name;
    if (location) {
      newMarker = addMarkerToMap({name, location}, map, maps);
    }
    map.fitBounds(viewport);

    let address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    const latLng = { lat: map.center.lat(), lng: map.center.lng() };
    updateLocation(address, latLng, newMarker);
    setAutocompleteInput(true);
  });
};

const placeChanged = (maps: any, map: any, autocompleteInput: any, marker: any, handleAutocompleteInputDialogOpen: any, updateLocation: any, setAutocompleteInput: any) => {
  console.log('place_changed')
  console.log('drawerOption.marker placeListener', marker)
  if (marker.length !== 0) {
    console.log('drawerOption.marker[0].setMap(null)')
    console.log('drawerOption.marker[0]',marker[0])
    // drawerOption.marker.map((marker: any) => {
    //   marker.setMap(null);
    // });
    marker[0].setMap(null);
  }
  let newMarker;
  const place = autocompleteInput.getPlace();
  if (!place.geometry) {
    // User entered the name of a Place that was not suggested and
    // pressed the Enter key, or the Place Details request failed.
    console.log("No details available for input: '" + place.name + "'");
    handleAutocompleteInputDialogOpen();
    return;
  }

  const { location, viewport } = place.geometry;
  const name = place.name;
  if (location) {
    newMarker = addMarkerToMap({name, location}, map, maps);
  }
  map.fitBounds(viewport);

  let address = '';
  if (place.address_components) {
    address = [
      (place.address_components[0] && place.address_components[0].short_name || ''),
      (place.address_components[1] && place.address_components[1].short_name || ''),
      (place.address_components[2] && place.address_components[2].short_name || '')
    ].join(' ');
  }

  const latLng = { lat: map.center.lat(), lng: map.center.lng() };
  updateLocation(address, latLng, newMarker);
  setAutocompleteInput(true);
};