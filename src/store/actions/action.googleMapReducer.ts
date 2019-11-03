// action types

export const ADD_MARKER = 'ADD_MARKER';
export const RESET_MARKER = 'RESET_MARKER';
export const ADD_PLACE_LISTENER = 'ADD_PLACE_LISTENER';
export const ADD_MAP = 'ADD_MAP';
export const RESET_STATE = 'RESET_STATE';

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

export const addMap = (map: any) => {
  return { type: ADD_MAP, map }
};

export const resetState = () => {
  return { type: RESET_STATE }
};