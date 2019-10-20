import {
  ADD_ADDRESS, ADD_LAT_LNG, ADD_MARKER_LAT_LNG, CLOSE_DRAWER, OPEN_DRAWER, RESET_ADDRESS,
  RESET_REDIRECT, SET_REDIRECT, UPDATE_LOCATION
} from "../actions/action.mapReducer";


const mapInitState: any = {
  address: '',
  latLng: { lat: 32.109333, lng: 34.855499 },
  open: false,
  redirect: false,
  isUpdateLocation: false,
  bounds: {},
  recover: false,
  mapCentre: null,
  mapZoom: null,
  numOfMarkers: null,
  markerLatLng: {}
};

const mapReducer = (state = mapInitState, action: any) => {
  switch (action.type) {
    case ADD_ADDRESS:
      return {
        ...state,
        address: action.address,
      };
    case RESET_ADDRESS:
      return {
        ...state,
        // address: '',
        address: state.address,
      };
    case ADD_LAT_LNG:
      return {
        ...state,
        latLng: action.latLng,
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        address: action.address,
        latLng: action.latLng,
        open: true,
        isUpdateLocation: true
      };
    case OPEN_DRAWER:
      return {
        ...state,
        open: true
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        open: false
      };
    case SET_REDIRECT:
      return {
        ...state,
        redirect: true,
        bounds: action.bounds,
        latLng: action.latLng,
        mapCentre: action.mapCentre,
        mapZoom: action.mapZoom,
        numOfMarkers: action.numOfMarkers,
        address: action.address,
      };
    case RESET_REDIRECT:
      return {
        ...state,
        redirect: false,
      };
    case ADD_MARKER_LAT_LNG:
      return {
        ...state,
        markerLatLng: action.latLng,
      };
    default:
      return state;
  }
};

export default mapReducer;