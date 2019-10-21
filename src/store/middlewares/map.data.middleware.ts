import {Dispatch, Middleware, MiddlewareAPI} from 'redux';
import {store} from "../../index";
import {resetPopstate, setPopstate, setRedirect} from "../actions/action.mapReducer";
import {MAP_DATA_SET, MAP_LOAD_DATA_SET} from "../actions/action.mapDataMiddleware";
import {resetMarker} from "../actions/action.googleMapReducer";
import {loadStateFromLocalStorage, saveStateToLocalStorage} from "../../helpers/localStorage";
import {throttle} from 'lodash'
import {mapBoardsDataSet} from "../actions/action.boardsDataReducer";

// To save map data if user press refresh or google redirect

const saveMapData: Middleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => action => {
  if (action.type === MAP_DATA_SET) {
    const map = store.getState().googleMap.map;
    const marker = store.getState().googleMap.marker;
    const address = store.getState().map.address;
    // const currentBounds = map.getBounds();
    const currentBounds = null;
    const mapZoom = map.getZoom();
    const mapCentre = map.getCenter();
    const latLng = { lat: mapCentre.lat(), lng: mapCentre.lng()};
    const numOfMarkers = marker.length;
    marker.map((marker: any) => marker.setMap(null));
    dispatch(setRedirect(currentBounds, latLng, mapCentre, mapZoom, numOfMarkers, address));
    if (action.popstate === 'popstate') {
      console.log('saveMapData popstate')
      dispatch(setPopstate());
    }
  }
  return next(action);
};

const loadMapData: Middleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => action => {
  console.log('loadMapData')
  if (action.type === MAP_LOAD_DATA_SET) {
    const persistedState = action.persistedState;
    const { currentBounds, latLng, mapCentre, mapZoom, numOfMarkers, address } = persistedState.map;
    const mapBoards = persistedState.mapBoards.mapBoards;
    dispatch(setRedirect(currentBounds, latLng, mapCentre, mapZoom, numOfMarkers, address));
    dispatch(mapBoardsDataSet(mapBoards));
    dispatch(resetPopstate());
  }
  return next(action);
};

export const mapDataMiddleware = [saveMapData, loadMapData];