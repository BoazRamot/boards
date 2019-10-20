import {Dispatch, Middleware, MiddlewareAPI} from 'redux';
import {store} from "../../index";
import {setRedirect} from "../actions/action.mapReducer";
import {MAP_DATA_SET} from "../actions/action.mapDataMiddleware";

const saveMapData: Middleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => action => {
  if (action.type === MAP_DATA_SET) {
    const map = store.getState().googleMap.map;
    const marker = store.getState().googleMap.marker;
    const address = store.getState().map.address;
    const currentBounds = map.getBounds();
    const mapZoom = map.getZoom();
    const mapCentre = map.getCenter();
    const latLng = { lat: mapCentre.lat(), lng: mapCentre.lng()};
    const numOfMarkers = marker.length;
    dispatch(setRedirect(currentBounds, latLng, mapCentre, mapZoom, numOfMarkers, address));
  }
  return next(action);
};

export const mapDataMiddleware = [saveMapData];