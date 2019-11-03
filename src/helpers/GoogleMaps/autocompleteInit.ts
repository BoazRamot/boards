import { addMarkerToMap } from './addMarkerToMap';

export const autocompleteInit = (
  autocompleteActions: any,
  addPlaceListener: any,
  map: any,
  autocompleteBoxRef: any,
  maps: any,
) => {
  const input = (autocompleteBoxRef.current as any).querySelector('input');
  const autocompleteInput = new maps.places.Autocomplete(input);
  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocompleteInput.bindTo('bounds', map);
  autocompleteInput.setFields([
    'address_components',
    'geometry',
    'icon',
    'name',
  ]);

  const placeListener = (autocompleteInput as any).addListener(
    'place_changed',
    () => {
      console.log('place_changed');
      let newMarker;
      const place = autocompleteInput.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        console.log(`No details available for input: '${place.name}'`);
        autocompleteActions.handleAutocompleteInputDialogOpen();
        return;
      }

      const {
        location,
        /*viewport,*/
      } = place.geometry;

      const name = place.name;
      if (location) {
        newMarker = addMarkerToMap({ name, location }, map, maps);
      }
      // map.setCenter(location);
      // map.setZoom(16);
      map.panTo(location);
      // map.fitBounds(viewport);

      let address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] &&
            place.address_components[0].short_name) ||
            '',
          (place.address_components[1] &&
            place.address_components[1].short_name) ||
            '',
          (place.address_components[2] &&
            place.address_components[2].short_name) ||
            '',
        ].join(' ');
      }

      const latLng = { lat: map.center.lat(), lng: map.center.lng() };
      autocompleteActions.updateLocation(address, latLng, newMarker);
      autocompleteActions.setAutocompleteInput(true);
      autocompleteActions.getAllBoards();
    },
  );
  addPlaceListener(placeListener);
};
