// action types

export const ADD_ADDRESS = 'ADD_ADDRESS';
export const RESET_ADDRESS = 'RESET_ADDRESS';
export const ADD_LAT_LNG = 'ADD_LAT_LNG';
export const OPEN_DRAWER = 'OPEN_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const SET_REDIRECT = 'SET_REDIRECT';
export const RESET_REDIRECT = 'RESET_REDIRECT';
export const ADD_MARKER_LAT_LNG = 'ADD_MARKER_LAT_LNG';

// action creators

export const addAddress = (address: string) => {
  return { type: ADD_ADDRESS, address }
};

export const resetAddress = () => {
  return { type: ADD_ADDRESS }
};

export const addLatLng = (latLng: any) => {
  return { type: ADD_LAT_LNG, latLng }
};

export const updateLocation = (address: string, latLng: any) => {
  return { type: UPDATE_LOCATION, address, latLng }
};

export const openDrawer = () => {
  return { type: OPEN_DRAWER }
};

export const closeDrawer = () => {
  return { type: CLOSE_DRAWER }
};

export const resetRedirect = () => {
  return { type: RESET_REDIRECT }
};

export const addMarkerLatLng = (latLng: any) => {
  return { type: ADD_MARKER_LAT_LNG, latLng }
};

export const setRedirect = (bounds: any, latLng: any, mapCentre: any, mapZoom: any, numOfMarkers: any, address: string) => {
  return { type: SET_REDIRECT, bounds, latLng, mapCentre, mapZoom, numOfMarkers, address }
};