import {
  ADD_ADDRESS, ADD_BOARDS, ADD_LAT_LNG,
  ADD_MARKER, ADD_MARKERS, ADD_PLACE_LISTENER,
  CLOSE_DRAWER,
  OPEN_DRAWER, RESET_BOARDS,
  RESET_MARKER, RESET_REDIRECT, RESET_SEARCH, SET_REDIRECT, UPDATE_LOCATION, UPDATE_REDIRECT
} from "../actions/action.mapReducer";


const mapInitState: any = {
  address: '',
  latLng: { lat: 32.109333, lng: 34.855499 },
  open: false,
  marker: [],
  mapBoards: [],
  redirect: false,
  isUpdateLocation: false,
  placeListener: null
};

const mapReducer = (state = mapInitState, action: any) => {
  switch (action.type) {
    case ADD_PLACE_LISTENER:
      return {
        ...state,
        placeListener: action.placeListener,
      };
    case ADD_ADDRESS:
      return {
        ...state,
        address: action.address,
      };
    case ADD_LAT_LNG:
      return {
        ...state,
        latLng: action.latLng,
      };
    case ADD_MARKER:
      return {
        ...state,
        marker: [action.marker]
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        address: action.address,
        latLng: action.latLng,
        open: true,
        marker: [action.marker],
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
    case RESET_SEARCH:
      return {
        ...state,
        marker: [],
        mapBoards: []
      };
    case RESET_MARKER:
      return {
        ...state,
        marker: [],
      };
    case RESET_BOARDS:
      return {
        ...state,
        mapBoards: []
      };
    case ADD_MARKERS:
      return {
        ...state,
        marker: [...state.marker, ...action.marker]
      };
    case ADD_BOARDS:
      return {
        ...state,
        mapBoards: [...state.mapBoards, ...action.mapBoards]
      };
    case SET_REDIRECT:
      return {
        ...state,
        redirect: true,
        latLng: action.latLng,
      };
    case UPDATE_REDIRECT:
      return {
        ...state,
        mapBoards: [...state.mapBoards, ...action.mapBoards],
        address: action.address,
        latLng: action.latLng,
        redirect: true
      };
    case RESET_REDIRECT:
      return {
        ...state,
        redirect: false,
      };
    default:
      return state;
  }
};

export default mapReducer;