import React, {useCallback, useEffect, useRef, useState} from "react";
import clsx from 'clsx';
import {GoogleMap} from "@react-google-maps/api";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {
  addAddress,
  addLatLng, addMarkerLatLng,
  closeDrawer,
  openDrawer,
  resetAddress, resetFindLocation, resetRedirect,
  updateLocation
} from "../../../store/actions/action.mapReducer";
import useStyles from "./useStyles";
import {isBoardCloseToUser} from "../../../helpers/GoogleMaps/isBoardCloseToUser";
import MapResultDrawer from "../MapResultDrawer";
import {addMarkerToMap} from "../../../helpers/GoogleMaps/addMarkerToMap";
import AutoCompleteInput from "../AutoCompleteInput";
import {autocompleteInit} from "../../../helpers/GoogleMaps/autocompleteInit";
import AutocompleteInputDialog from "../AutocompleteInputDialog";
import {findGeolocation} from "../../../helpers/GoogleMaps/findGeolocation";
import {getAllBoards} from "../../../store/actions/action.mapApiMiddleware";
import {mapBoardsDataSet, resetMapBoardsData} from "../../../store/actions/action.boardsDataReducer";
import {addMap, addMarker, addMarkers, addPlaceListener, resetMarker} from "../../../store/actions/action.googleMapReducer";

declare global {
  interface Window { google: any; }
}

window.google = window.google || {};

interface IProps {
  marker: any
  markerLatLng: any
  resetSearch: Function
  mapBoards: any
  addMarkers: Function
  latLng: any
  updateLocation: Function
  openDrawer: Function
  closeDrawer: Function
  addLatLng: Function
  addPlaceListener: Function
  addMarker: Function
  getAllBoards: Function
  address: string
  isOpen: boolean
  redirect: boolean
  isUpdateLocation: boolean
  isLogin: boolean
  findLocation: boolean
  addMap: Function
  map: any
  bounds: any
  mapCentre: any
  mapZoom: any
  numOfMarkers: any
  resetAddress: Function
  resetRedirect: Function
  addAddress: Function
  resetFindLocation: Function
  mapBoardsDataSet: Function
}

const GoogleMapService: React.FC<IProps> = ({ mapBoardsDataSet, resetFindLocation, markerLatLng, addAddress, resetRedirect, resetAddress, mapZoom, numOfMarkers, mapCentre, bounds, findLocation, map, addMap, getAllBoards, addMarker, isLogin, addPlaceListener, isUpdateLocation, redirect, addLatLng, marker, resetSearch, mapBoards, addMarkers, latLng, updateLocation, address, isOpen, openDrawer, closeDrawer }) => {
  // autocompleteInput disabled
  const [autocompleteInput, setAutocompleteInput] = useState(false);
  // autocompleteInput select list alert
  const [openAutocompleteInputDialog, setOpenAutocompleteInputDialog] = useState(false);
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

  const addBoardsToMap = (map: any, mapBoards: any, latLng: any) => {
    if (mapBoards.length !== 0) {
      // const map = (mapRef.current as any).state.map;
      const markers: any = [];
      // const reduceBoards = mapBoards.map((board: any) => {
      mapBoards.map((board: any) => {
        // search within area
        if (isBoardCloseToUser(board, latLng)) {
          const location = { lat: board.location.latitude, lng: board.location.longitude };
          const place = {name: board.name, location};

          // // todo: display only what on user view
          // const userView = map.getBounds();
          // if (userView.contains(location)) {
          //   console.log(board.name)
          // }

          const marker = addMarkerToMap(place, map, maps);
          markers.push(marker);
          // return board;
      }});
      addMarkers(markers);
      // mapBoardsDataSet(reduceBoards);
    }
  };
  
  useEffect(() => {
    if (!clearButton && marker.length !== 0) {
      marker.map((marker: any) => marker.setMap(null));
      // clear marker && mapBoards
      resetSearch();
      setAutocompleteInput(false);
    }
  }, [clearButton]);
  
  useEffect(() => {

    // if ( ( persistedState.mapBoards.mapBoards.length === 0 ) && (store.getState().googleMap.marker.length > 1 ) ) {
    //   console.log('test persistedState')
    // }
    
    if (mapBoards.length !== 0) {
      addBoardsToMap(map, mapBoards, latLng);
    }
  }, [mapBoards]);

  const onLoad = useCallback(
    function onLoad(map: any) {
      console.log('onLoad')
      if (redirect) {
        map.setCenter(latLng);
        map.setZoom(mapZoom);
        if (numOfMarkers > 0) {
          const place = {name: address, location: markerLatLng}
          const newMarker = addMarkerToMap(place, map, maps);
          addMarker(newMarker);
          setAutocompleteInput(true);
        }
        if (numOfMarkers > 1) {
          addBoardsToMap(map, mapBoards, markerLatLng);
        }
        // resetRedirect();
      } else {
        findGeolocation(map, maps);
      }
      // findGeolocation(map, maps);
      const autocompleteActions = { 
        getAllBoards, 
        handleAutocompleteInputDialogOpen, 
        updateLocation, 
        setAutocompleteInput,
      };
      autocompleteInit(autocompleteActions, addPlaceListener, map, autocompleteBoxRef, maps);
      addMap(map);
    }, []
  );

  const reverseGeocoding = (map: any, latLng: any) => {
    const geocoder = new maps.Geocoder;
    geocoder.geocode({'location': latLng}, (results: any, status: any) => {
      if (status === 'OK') {
        console.log(results)
        if (results[0]) {
          map.panTo(latLng);
          const address = results[0].formatted_address;
          const place = {name: address, location: markerLatLng};
          const newMarker = addMarkerToMap(place, map, maps);
          updateLocation(address, latLng, newMarker);
          setAutocompleteInput(true);
          getAllBoards();
          (autocompleteBoxRef.current as any).querySelector('input').value = address;
          setClearButton(true);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
    resetFindLocation();
    map.setOptions({draggableCursor: undefined});
    setAutocompleteInput(false);
  };

  const handleClick = (e: any) => {
    if (!findLocation) return;
    const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    reverseGeocoding(map, latLng)
  };
  
  return (
    <div className={classes.root}>
      <AutocompleteInputDialog
        openAutocompleteInputDialog={openAutocompleteInputDialog}
        handleAutocompleteInputDialogClose={handleAutocompleteInputDialogClose}/>
      <MapResultDrawer/>
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
            position: maps.ControlPosition.LEFT_BOTTOM
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
  mapBoardsDataSet: (boards: any) => dispatch(mapBoardsDataSet(boards)),
  addAddress: (address: any) => dispatch(addAddress(address)),
  addMap: (map: any) => dispatch(addMap(map)),
  resetFindLocation: () => dispatch(resetFindLocation()),
  getAllBoards: () => dispatch(getAllBoards()),
  resetRedirect: () => dispatch(resetRedirect()),
  resetSearch: () => {
    dispatch(resetMarker());
    dispatch(resetMapBoardsData());
  },
  closeDrawer: () => dispatch(closeDrawer()),
  openDrawer: () => dispatch(openDrawer()),
  resetAddress: () => dispatch(resetAddress()),
  addPlaceListener: (placeListener: any) => dispatch(addPlaceListener(placeListener)),
  addMarker: (marker: any) => dispatch(addMarker(marker)),
  addLatLng: (latLng: any) => dispatch(addLatLng(latLng)),
  addMarkerLatLng: (latLng: any) => dispatch(addMarkerLatLng(latLng)),
  addMarkers: (marker: any) => dispatch(addMarkers(marker)),
  updateLocation: (address: string, latLng: any, marker: any) => {
    dispatch(updateLocation(address, latLng));
    dispatch(addMarker(marker));
    dispatch(addMarkerLatLng(latLng));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMapService);
