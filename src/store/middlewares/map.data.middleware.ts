// import { throttle } from 'lodash';
import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
// import {
//   loadStateFromLocalStorage,
//   saveStateToLocalStorage,
// } from '../../helpers/localStorage';
import { store } from '../../index';
import { mapBoardsDataSetAction } from '../actions/action.boardsDataReducer';
// import { resetMarkerAction } from '../actions/action.googleMapReducer';
import {
  MAP_DATA_SET,
  MAP_LOAD_DATA_SET,
} from '../actions/action.mapDataMiddleware';
import {
  resetPopstateAction,
  setPopstateAction,
  setRedirectAction,
} from '../actions/action.mapReducer';

// To save map data if user press refresh or google redirect

const saveMapData: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => action => {
  if (action.type === MAP_DATA_SET) {
    const map = store.getState().googleMap.map;
    const marker = store.getState().googleMap.marker;
    const address = store.getState().map.address;
    // const currentBounds = map.getBounds();
    const currentBounds = null;
    const mapZoom = map.getZoom();
    const mapCentre = map.getCenter();
    const latLng = { lat: mapCentre.lat(), lng: mapCentre.lng() };
    const numOfMarkers = marker.length;
    // eslint-disable-next-line
    marker.map((_marker: any) => {
      _marker.setMap(null);
    });
    dispatch(
      setRedirectAction(
        currentBounds,
        latLng,
        mapCentre,
        mapZoom,
        numOfMarkers,
        address,
      ),
    );
    if (action.popstate === 'popstate') {
      console.log('saveMapData popstate');
      dispatch(setPopstateAction());
    }
  }
  return next(action);
};

const loadMapData: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => action => {
  console.log('loadMapData');
  if (action.type === MAP_LOAD_DATA_SET) {
    const persistedState = action.persistedState;
    const {
      currentBounds,
      latLng,
      mapCentre,
      mapZoom,
      numOfMarkers,
      address,
    } = persistedState.map;
    const mapBoards = persistedState.mapBoards.mapBoards;
    dispatch(
      setRedirectAction(
        currentBounds,
        latLng,
        mapCentre,
        mapZoom,
        numOfMarkers,
        address,
      ),
    );
    dispatch(mapBoardsDataSetAction(mapBoards));
    dispatch(resetPopstateAction());
  }
  return next(action);
};

export const mapDataMiddleware = [saveMapData, loadMapData];
