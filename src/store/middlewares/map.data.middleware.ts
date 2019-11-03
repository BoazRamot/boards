import {Dispatch, Middleware, MiddlewareAPI} from 'redux';
import {store} from "../../index";
import {resetPopstate, setPopstate, setRedirect} from "../actions/action.mapReducer";
import {MAP_DATA_SET, MAP_LOAD_DATA_SET} from "../actions/action.mapDataMiddleware";
import {mapBoardsDataSet, resetMapBoardsData} from "../actions/action.boardsDataReducer";
import {resetMarker} from "../actions/action.googleMapReducer";

// To save map data if user press refresh or google redirect

const saveMapData: Middleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => action => {
  if (action.type === MAP_DATA_SET) {
    console.log('saveMapData')
    // if (action.board) {
    //   dispatch(setPopstate());
    // }
    const map = store.getState().googleMap.map;
    const markersMap = store.getState().googleMap.markersMap;
    // const address = store.getState().map.address;
    const board = store.getState().mapBoards.board;
    const currentBounds = null;
    let mapZoom, latLng, mapCentre, numOfMarkers, address;
    if (action.board) {
      address = board.location.address;
      mapZoom = 16;
      latLng = { lat: board.location.latitude, lng: board.location.longitude};
      mapCentre = latLng;
      numOfMarkers = 1;
      dispatch(setPopstate());
      dispatch(resetMapBoardsData());
    } else {
      address = store.getState().map.address;
      mapZoom = map.getZoom();
      mapCentre = map.getCenter();
      latLng = { lat: mapCentre.lat(), lng: mapCentre.lng()};
      numOfMarkers = 0;
    }
    if (markersMap) {
      console.log('saveMapData clean')
      numOfMarkers = markersMap.size;
      markersMap.forEach((marker: any, user: any) => marker.setMap(null));
    }
    dispatch(setRedirect(currentBounds, latLng, mapCentre, mapZoom, numOfMarkers, address));
    // if (action.board) {
    //   dispatch(setPopstate());
    // }
  }
  return next(action);
};

const loadMapData: Middleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => action => {
  // if (action.type === MAP_LOAD_DATA_SET) {
  //   console.log('loadMapData popstate')
  //   const map = store.getState().googleMap.map;
  //   const markersMap = store.getState().googleMap.markersMap;
  //   markersMap.forEach((marker: any, user: any) => marker.setMap(null));
  //   // window.google.maps.event.trigger(map, 'resize');
  //   // dispatch(resetMarker());
  //  
  //  
  //   // const markersMap = store.getState().googleMap.markersMap;
  //   // markersMap.forEach((marker: any, user: any) => marker.setMap(null));
  //   // const persistedState = action.persistedState;
  //   // const { currentBounds, latLng, mapCentre, mapZoom, numOfMarkers, address } = persistedState.map;
  //   // const mapBoards = persistedState.mapBoards.mapBoards;
  //   // dispatch(setRedirect(currentBounds, latLng, mapCentre, mapZoom, numOfMarkers, address));
  //   // dispatch(mapBoardsDataSet(mapBoards));
  //   // dispatch(resetPopstate());
  // }
  return next(action);
};

export const mapDataMiddleware = [saveMapData, loadMapData];