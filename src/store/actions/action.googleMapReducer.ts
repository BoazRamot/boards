// action types

export const ADD_MARKER = 'ADD_MARKER';
export const RESET_MARKER = 'RESET_MARKER';
export const ADD_MARKERS = 'ADD_MARKERS';
export const ADD_PLACE_LISTENER = 'ADD_PLACE_LISTENER';
export const ADD_MAP = 'ADD_MAP';

// action creators

export const addPlaceListener = (placeListener: any) => {
  return { type: ADD_PLACE_LISTENER, placeListener }
};

export const addMarker = (marker: any) => {
  return { type: ADD_MARKER, marker }
};

export const resetMarker = () => {
  return { type: RESET_MARKER }
};

export const addMarkers = (marker: any) => {
  return { type: ADD_MARKERS, marker }
};

export const addMap = (map: any) => {
  return { type: ADD_MAP, map }
};