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
  resetAddress, resetRedirect,
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
import {resetMapBoardsData} from "../../../store/actions/action.boardsDataReducer";
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
  recover: boolean
  addMap: Function
  map: any
  bounds: any
  mapCentre: any
  mapZoom: any
  numOfMarkers: any
  resetAddress: Function
  resetRedirect: Function
  addAddress: Function
}

const GoogleMapService: React.FC<IProps> = ({ markerLatLng, addAddress, resetRedirect, resetAddress, mapZoom, numOfMarkers, mapCentre, bounds, recover, map, addMap, getAllBoards, addMarker, isLogin, addPlaceListener, isUpdateLocation, redirect, addLatLng, marker, resetSearch, mapBoards, addMarkers, latLng, updateLocation, address, isOpen, openDrawer, closeDrawer }) => {
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
      mapBoards.map((board: any) => {
        if (isBoardCloseToUser(board, latLng)) {
          const location = { lat: board.location.latitude, lng: board.location.longitude };
          const place = {name: board.name, location};
          const marker = addMarkerToMap(place, map, maps);
          markers.push(marker);
      }});
      addMarkers(markers)
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
    if (mapBoards.length !== 0) {
      addBoardsToMap(map, mapBoards, latLng);
    }
  }, [mapBoards]);

  const onLoad = useCallback(
    function onLoad(map: any) {
      console.log('onLoad')
      map.setOptions({
        disableDefaultUI: true
      });
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







  // const onBoundsChanged = useCallback(
  //   function onBoundsChanged() {
  //     console.log('onBoundsChanged')
  //     const map = (mapRef.current as any).state.map;
  //     const newLatLng = { lat: map.center.lat(), lng: map.center.lng() };
  //     addLatLng(newLatLng);
  //     // const map = (mapRef.current as any).state.map;
  //     // (searchBoxRef.current as any).state.searchBox.setBounds(map.getBounds())
  //   }, []
  // );

  const reverseGeocoding = (map: any, latLng: any) => {
    // const map = (mapRef.current as any).state.map;
    const geocoder = new maps.Geocoder;
    geocoder.geocode({'location': latLng}, function(results: any, status: any) {
      if (status === 'OK') {
        console.log(results)
        // if (results[0]) {
        //   const infoWindow = new window.google.maps.InfoWindow;
        //   infoWindow.setPosition(latLng);
        //   infoWindow.setContent('Location found.');
        //   infoWindow.open(map);
        //   map.setCenter(latLng);
        //   map.fitBounds(results[0].geometry.viewport);
        // } else {
        //   // window.alert('No results found');
        // }
      } else {
        // window.alert('Geocoder failed due to: ' + status);
      }
    });
  };

  const handleClick = (e: any) => {
    const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    // reverseGeocoding(latLng)
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
        // zoom={zoom}
        // center={{lat, lng}}
        mapContainerClassName={clsx(classes.content, {
          [classes.contentShift]: isOpen,
        })}
        onClick={e => handleClick(e)}
        onLoad={onLoad}
        // onBoundsChanged={onBoundsChanged}
      >
        <AutoCompleteInput
          autocompleteBoxRef={autocompleteBoxRef}
          setClearButton={setClearButton}
          autocompleteInput={autocompleteInput}
          clearButton={clearButton}
        />
      </GoogleMap>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  marker: state.googleMap.marker,
  recover: state.map.recover,
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
  mapBoards: state.mapBoards,
  map: state.googleMap.map,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addAddress: (address: any) => dispatch(addAddress(address)),
  addMap: (map: any) => dispatch(addMap(map)),
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
