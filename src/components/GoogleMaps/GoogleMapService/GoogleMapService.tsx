import { GoogleMap } from '@react-google-maps/api';
import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addMarkerToMap } from '../../../helpers/GoogleMaps/addMarkerToMap';
import { autocompleteInit } from '../../../helpers/GoogleMaps/autocompleteInit';
import { findGeolocation } from '../../../helpers/GoogleMaps/findGeolocation';
import { isBoardCloseToUser } from '../../../helpers/GoogleMaps/isBoardCloseToUser';
import {
  mapBoardsDataSetAction,
  resetMapBoardsDataAction,
} from '../../../store/actions/action.boardsDataReducer';
import {
  addMapAction,
  addMarkerAction,
  addMarkersAction,
  addPlaceListenerAction,
  resetMarkerAction,
} from '../../../store/actions/action.googleMapReducer';
import { getAllBoardsAction } from '../../../store/actions/action.mapApiMiddleware';
import {
  addAddressAction,
  addLatLngAction,
  addMarkerLatLngAction,
  closeDrawerAction,
  openDrawerAction,
  resetAddressAction,
  resetFindLocationAction,
  resetRedirectAction,
  updateLocationAction,
} from '../../../store/actions/action.mapReducer';
import AutoCompleteInput from '../AutoCompleteInput';
import AutocompleteInputDialog from '../AutocompleteInputDialog';
import MapResultDrawer from '../MapResultDrawer';
import useStyles from './useStyles';

declare global {
  // tslint:disable-next-line: interface-name
  interface Window {
    google: any;
  }
}

window.google = window.google || {};

interface IProps {
  marker: any;
  markerLatLng: any;
  resetSearch: Function;
  mapBoards: any;
  addMarkers: Function;
  latLng: any;
  updateLocation: Function;
  openDrawer: Function;
  closeDrawer: Function;
  addLatLng: Function;
  addPlaceListener: Function;
  addMarker: Function;
  getAllBoards: Function;
  address: string;
  isOpen: boolean;
  redirect: boolean;
  isUpdateLocation: boolean;
  isLogin: boolean;
  findLocation: boolean;
  addMap: Function;
  map: any;
  bounds: any;
  mapCentre: any;
  mapZoom: any;
  numOfMarkers: any;
  resetAddress: Function;
  resetRedirect: Function;
  addAddress: Function;
  resetFindLocation: Function;
  mapBoardsDataSet: Function;
}

const GoogleMapService: React.FC<IProps> = ({
  mapBoardsDataSet,
  resetFindLocation,
  markerLatLng,
  addAddress,
  resetRedirect,
  resetAddress,
  mapZoom,
  numOfMarkers,
  mapCentre,
  bounds,
  findLocation,
  map,
  addMap,
  getAllBoards,
  addMarker,
  isLogin,
  addPlaceListener,
  isUpdateLocation,
  redirect,
  addLatLng,
  marker,
  resetSearch,
  mapBoards,
  addMarkers,
  latLng,
  updateLocation,
  address,
  isOpen,
  openDrawer,
  closeDrawer,
}) => {
  // autocompleteInput disabled
  const [autocompleteInput, setAutocompleteInput] = useState(false);
  // autocompleteInput select list alert
  const [
    openAutocompleteInputDialog,
    setOpenAutocompleteInputDialog,
  ] = useState(false);
  // autocompleteInput clear results
  const [clearButton, setClearButton] = useState(false);
  const autocompleteBoxRef = useRef(null);
  const mapRef = useRef(null);
  const classes = useStyles();
  const maps = window.google.maps;

  // useEffect(() => {
  //   if (mapBoards !== 0 && map) {
  //     console.log(map.getBounds())
  //     const boards = mapBoards.map((board: any) => {
  //       map.getBounds().contains({lat: board.location.latitude , lng: board.location.longitude})
  //     });
  //     console.log('board', boards)
  //   }
  //
  // });

  const handleAutocompleteInputDialogOpen = () => {
    setOpenAutocompleteInputDialog(true);
  };

  const handleAutocompleteInputDialogClose = () => {
    setOpenAutocompleteInputDialog(false);
  };

  const addBoardsToMap = (_map: any, _mapBoards: any, _latLng: any) => {
    if (_mapBoards.length !== 0) {
      // const map = (mapRef.current as any).state.map;
      const markers: any = [];
      // const reduceBoards = mapBoards.map((board: any) => {
      // eslint-disable-next-line
      _mapBoards.map(function(board: any) {
        // search within area
        if (isBoardCloseToUser(board, _latLng)) {
          const location = {
            lat: board.location.latitude,
            lng: board.location.longitude,
          };
          const place = { name: board.name, location };

          // // todo: display only what on user view
          // const userView = map.getBounds();
          // if (userView.contains(location)) {
          //   console.log(board.name)
          // }

          const _marker = addMarkerToMap(place, _map, maps);
          markers.push(_marker);
          // return board;
        }
      });
      addMarkers(markers);
      // mapBoardsDataSet(reduceBoards);
    }
  };

  useEffect(() => {
    if (!clearButton && marker.length !== 0) {
      marker.map((_marker: any) => _marker.setMap(null));
      // clear marker && mapBoards
      resetSearch();
      setAutocompleteInput(false);
    }
    // eslint-disable-next-line
  }, [clearButton]);

  useEffect(() => {
    // if ( ( persistedState.mapBoards.mapBoards.length === 0 ) && (store.getState().googleMap.marker.length > 1 ) ) {
    //   console.log('test persistedState')
    // }
    if (mapBoards.length !== 0) {
      addBoardsToMap(map, mapBoards, latLng);
    }
    // eslint-disable-next-line
  }, [mapBoards]);

  const onLoad = useCallback(function _onLoad(_map: any) {
    console.log('onLoad');
    if (redirect) {
      _map.setCenter(latLng);
      _map.setZoom(mapZoom);
      if (numOfMarkers > 0) {
        const place = { name: address, location: markerLatLng };
        const newMarker = addMarkerToMap(place, _map, maps);
        addMarker(newMarker);
        setAutocompleteInput(true);
      }
      if (numOfMarkers > 1) {
        addBoardsToMap(_map, mapBoards, markerLatLng);
      }
      // resetRedirect();
    } else {
      findGeolocation(_map, maps);
    }
    // findGeolocation(map, maps);
    const autocompleteActions = {
      getAllBoards,
      handleAutocompleteInputDialogOpen,
      updateLocation,
      setAutocompleteInput,
    };
    autocompleteInit(
      autocompleteActions,
      addPlaceListener,
      _map,
      autocompleteBoxRef,
      maps,
    );
    addMap(_map);
    // eslint-disable-next-line
  }, []);

  const reverseGeocoding = (_map: any, _latLng: any) => {
    const geocoder = new maps.Geocoder();
    geocoder.geocode({ location: _latLng }, (results: any, status: any) => {
      if (status === 'OK') {
        console.log(results);
        if (results[0]) {
          _map.panTo(_latLng);
          const _address = results[0].formatted_address;
          const place = { name: _address, location: markerLatLng };
          const newMarker = addMarkerToMap(place, _map, maps);
          updateLocation(_address, _latLng, newMarker);
          setAutocompleteInput(true);
          getAllBoards();
          (autocompleteBoxRef.current as any).querySelector(
            'input',
          ).value = _address;
          setClearButton(true);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
    resetFindLocation();
    _map.setOptions({ draggableCursor: undefined });
    setAutocompleteInput(false);
  };

  const handleClick = (e: any) => {
    if (!findLocation) {
      return;
    }
    const _latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    reverseGeocoding(map, _latLng);
  };

  return (
    <div className={classes.root}>
      <AutocompleteInputDialog
        openAutocompleteInputDialog={openAutocompleteInputDialog}
        handleAutocompleteInputDialogClose={handleAutocompleteInputDialogClose}
      />
      <MapResultDrawer />
      <GoogleMap
        id="map"
        ref={mapRef}
        center={latLng}
        zoom={13}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: true,
          mapTypeControlOptions: {
            position: maps.ControlPosition.LEFT_BOTTOM,
          },
        }}
        mapContainerClassName={clsx(classes.content, {
          [classes.contentShift]: isOpen,
        })}
        onClick={handleClick}
        onLoad={onLoad}
      >
        <AutoCompleteInput
          autocompleteBoxRef={autocompleteBoxRef}
          setClearButton={setClearButton}
          autocompleteInput={autocompleteInput}
          clearButton={clearButton}
          setAutocompleteInput={setAutocompleteInput}
        />
      </GoogleMap>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  marker: state.googleMap.marker,
  findLocation: state.map.findLocation,
  latLng: state.map.latLng,
  markerLatLng: state.map.markerLatLng,
  mapCentre: state.map.mapCentre,
  mapZoom: state.map.mapZoom,
  numOfMarkers: state.map.numOfMarkers,
  bounds: state.map.bounds,
  address: state.map.address,
  isOpen: state.map.open,
  redirect: state.map.redirect,
  isUpdateLocation: state.map.isUpdateLocation,
  isLogin: state.user.userLogin,
  mapBoards: state.mapBoards.mapBoards,
  map: state.googleMap.map,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  mapBoardsDataSet: (boards: any) => dispatch(mapBoardsDataSetAction(boards)),
  addAddress: (address: any) => dispatch(addAddressAction(address)),
  addMap: (map: any) => dispatch(addMapAction(map)),
  resetFindLocation: () => dispatch(resetFindLocationAction()),
  getAllBoards: () => dispatch(getAllBoardsAction()),
  resetRedirect: () => dispatch(resetRedirectAction()),
  resetSearch: () => {
    dispatch(resetMarkerAction());
    dispatch(resetMapBoardsDataAction());
  },
  closeDrawer: () => dispatch(closeDrawerAction()),
  openDrawer: () => dispatch(openDrawerAction()),
  resetAddress: () => dispatch(resetAddressAction()),
  addPlaceListener: (placeListener: any) =>
    dispatch(addPlaceListenerAction(placeListener)),
  addMarker: (marker: any) => dispatch(addMarkerAction(marker)),
  addLatLng: (latLng: any) => dispatch(addLatLngAction(latLng)),
  addMarkerLatLng: (latLng: any) => dispatch(addMarkerLatLngAction(latLng)),
  addMarkers: (marker: any) => dispatch(addMarkersAction(marker)),
  updateLocation: (address: string, latLng: any, marker: any) => {
    dispatch(updateLocationAction(address, latLng));
    dispatch(addMarkerAction(marker));
    dispatch(addMarkerLatLngAction(latLng));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GoogleMapService);
