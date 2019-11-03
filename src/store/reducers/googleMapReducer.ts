import {
  ADD_MAP,
  ADD_MARKER,
  ADD_MARKERS,
  ADD_PLACE_LISTENER,
  RESET_MARKER,
  RESET_STATE,
} from '../actions/action.googleMapReducer';

const mapInitState: any = {
  marker: [],
  placeListener: null,
  map: null,
};

const googleMapReducer = (state = mapInitState, action: any) => {
  switch (action.type) {
    case ADD_MAP:
      return {
        ...state,
        map: action.map,
      };
    case ADD_PLACE_LISTENER:
      return {
        ...state,
        placeListener: action.placeListener,
      };
    case ADD_MARKER:
      return {
        ...state,
        marker: [action.marker],
      };
    case RESET_MARKER:
      return {
        ...state,
        marker: [],
      };
    case ADD_MARKERS:
      return {
        ...state,
        marker: [...state.marker, ...action.marker],
      };
    case RESET_STATE:
      return {
        ...state,
        map: null,
        marker: [],
        placeListener: null,
      };
    default:
      return state;
  }
};

export default googleMapReducer;
