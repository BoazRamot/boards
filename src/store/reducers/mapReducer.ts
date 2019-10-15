import {
  ADD_ADDRESS, ADD_BOARDS, ADD_LAT_LNG,
  ADD_MARKER, ADD_MARKERS,
  CLOSE_DRAWER,
  OPEN_DRAWER, RESET_BOARDS,
  RESET_MARKER, RESET_SEARCH, UPDATE_LOCATION
} from "../actions/action.mapReducer";


const mapInitState: any = {
  address: '',
  latLng: { lat: 32.109333, lng: 34.855499 },
  open: false,
  marker: [],
  mapBoards: []
};

const mapReducer = (state = mapInitState, action: any) => {
  switch (action.type) {
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
        marker: [action.marker]
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
    default:
      return state;
  }
};

export default mapReducer;