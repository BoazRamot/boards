// action types

export const ADD_ADDRESS = 'ADD_ADDRESS';
export const ADD_LAT_LNG = 'ADD_LAT_LNG';
export const ADD_MARKER = 'ADD_MARKER';
export const OPEN_DRAWER = 'OPEN_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';
export const RESET_MARKER = 'RESET_MARKER';
export const RESET_BOARDS = 'RESET_BOARDS';
export const ADD_MARKERS = 'ADD_MARKERS';
export const ADD_BOARDS = 'ADD_BOARDS';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const RESET_SEARCH = 'RESET_SEARCH';

// action creators
//  address: address, latLng: latLng, marker: marker});

export const addAddress = (address: string) => {
  return { type: ADD_ADDRESS, address }
};

export const addLatLng = (latLng: any) => {
  return { type: ADD_LAT_LNG, latLng }
};

export const addMarker = (marker: any) => {
  return { type: ADD_MARKER, marker }
};

export const updateLocation = (address: string, latLng: any, marker: any) => {
  return { type: UPDATE_LOCATION, address, latLng, marker }
};

export const openDrawer = () => {
  return { type: OPEN_DRAWER }
};

export const closeDrawer = () => {
  return { type: CLOSE_DRAWER }
};

export const resetSearch = () => {
  return { type: RESET_SEARCH }
};

export const resetMarker = () => {
  return { type: RESET_MARKER }
};

export const resetBoards = () => {
  return { type: RESET_BOARDS }
};

export const addMarkers = (marker: any) => {
  return { type: ADD_MARKERS, marker }
};

export const addBoards = (mapBoards: any) => {
  return { type: ADD_BOARDS, mapBoards }
};