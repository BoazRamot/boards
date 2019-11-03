import React, {useCallback, useEffect, useRef, useState} from "react";
import clsx from 'clsx';
import {GoogleMap, InfoWindow} from "@react-google-maps/api";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {
  addAddress, addLatLng, addMarkerLatLng, closeDrawer, openDrawer,
  resetAddress, resetFindLocation, resetPopstate, resetRedirect, updateLocation
} from "../../../store/actions/action.mapReducer";
import useStyles from "./useStyles";
import MapResultDrawer from "../MapResultDrawer";
import {addMarkerToMap} from "../../../helpers/GoogleMaps/addMarkerToMap";
import AutoCompleteInput from "../AutoCompleteInput";
import {autocompleteInit} from "../../../helpers/GoogleMaps/autocompleteInit";
import AutocompleteInputDialog from "../AutocompleteInputDialog";
import {findGeolocation} from "../../../helpers/GoogleMaps/findGeolocation";
import {getAllBoards, getBoardsByPoint} from "../../../store/actions/action.mapApiMiddleware";
import {mapBoardsDataSet, resetMapBoardsData} from "../../../store/actions/action.boardsDataReducer";
import {addMap, addMarker, addPlaceListener, resetMarker} from "../../../store/actions/action.googleMapReducer";

declare global {
  interface Window { google: any; }
}

window.google = window.google || {};

interface IProps {
  markersMap: any
  markerLatLng: any
  resetSearch: Function
  mapBoards: any
  latLng: any
  updateLocation: Function
  addPlaceListener: Function
  addMarker: Function
  getAllBoards: Function
  getBoardsByPoint: Function
  address: string
  markerAddress: string
  isOpen: boolean
  redirect: boolean
  popstate: boolean
  findLocation: boolean
  addMap: Function
  map: any
  mapZoom: any
  numOfMarkers: any
  board: any
  addAddress: Function
  resetFindLocation: Function
  resetPopstate: Function
  resetMarker: Function
}

const GoogleMapService: React.FC<IProps> = ({ board, markerAddress, resetMarker, popstate, resetPopstate, getBoardsByPoint, resetFindLocation, markerLatLng, mapZoom,
                                              numOfMarkers, findLocation, map, addMap, 
                                              getAllBoards, addMarker, addPlaceListener,
                                              redirect, markersMap, resetSearch, mapBoards, 
                                              latLng, updateLocation, address, isOpen }) => {
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

  const addBoardsToMap = (map: any, mapBoards: any, latLng: any, markersMap: any) => {
    if (mapBoards.length !== 0) {
      let bounds: any;
      if (map && markersMap.size !== 0) {
        bounds = new maps.LatLngBounds();
        const marker = markersMap.get("user");
        bounds.extend(marker.getPosition());
        mapBoards.map((board: any) => {
          const location = { lat: board.location.latitude, lng: board.location.longitude };
          const place = {name: board.name, location};
          const marker = addMarkerToMap(place, map, maps, true);
          markersMap.set(board._id, marker);
          bounds.extend(marker.getPosition());
        });
      }
      addMarker(markersMap);
      // if (map && markersMap.size > 1 && !redirect) {
      if (map && markersMap.size > 1) {
        map.fitBounds(bounds);
      }
    }
  };
  
  useEffect(() => {
    if (mapBoards.length !== 0) {
      addBoardsToMap(map, mapBoards, latLng, markersMap);
    }
  }, [mapBoards]);

  const onLoad = useCallback(
    function onLoad(map: any) {
      console.log('onLoad')
      console.log('onLoad popstate', popstate)
      if (redirect) {
        console.log('onLoad redirect')
        const newMarkersMap = new Map();
        map.setCenter(latLng);
        map.setZoom(mapZoom);
        if (numOfMarkers > 0 && address) {
          let place = {};
          if (popstate) {
            const boardLatLng = { lat: board.location.latitude, lng: board.location.longitude};
            place = {name: board.address, location: boardLatLng};
            getBoardsByPoint(boardLatLng);
            resetPopstate(board.address, boardLatLng);
          } else {
            place = {name: markerAddress, location: markerLatLng}
          }
          const newMarker = addMarkerToMap(place, map, maps);
          newMarkersMap.set("user", newMarker);
          addMarker(newMarkersMap);
          setAutocompleteInput(true);
        }
        if (numOfMarkers > 1) {
          addBoardsToMap(map, mapBoards, markerLatLng, newMarkersMap);
        }
      } else {
        findGeolocation(map, maps);
      }
      const autocompleteActions = { 
        getAllBoards, 
        handleAutocompleteInputDialogOpen, 
        updateLocation, 
        setAutocompleteInput,
        addPlaceListener,
        getBoardsByPoint
      };
      autocompleteInit(autocompleteActions, map, autocompleteBoxRef, maps);
      addMap(map);
    }, []
  );

  const reverseGeocoding = (map: any, latLng: any, maps: any) => {
    const geocoder = new maps.Geocoder;
    geocoder.geocode({'location': latLng}, (results: any, status: any) => {
      if (status === 'OK') {
        console.log(results)
        if (results[0]) {
          const newMarkersMap = new Map();
          map.panTo(latLng);
          const address = results[0].formatted_address;
          const place = {name: address, location: latLng};
          const newMarker = addMarkerToMap(place, map, maps);
          newMarkersMap.set("user", newMarker);
          updateLocation(address, latLng, newMarkersMap);
          setAutocompleteInput(true);
          getBoardsByPoint(latLng);
          (autocompleteBoxRef.current as any).querySelector('input').value = address;
          setClearButton(true);
        } else {
          window.alert('No results found'); // todo: dialog window
        }
      } else {
        window.alert('Geocoder failed due to: ' + status); // todo: dialog window
      }
    });
    resetFindLocation();
    map.setOptions({draggableCursor: undefined});
    setAutocompleteInput(false);
  };

  const handleClick = (e: any) => {
    if (!findLocation) return;
    const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    reverseGeocoding(map, latLng, maps)
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
          maps={maps}
          reverseGeocoding={reverseGeocoding}
        />
      </GoogleMap>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  markersMap: state.googleMap.markersMap,
  findLocation: state.map.findLocation,
  latLng: state.map.latLng,
  markerLatLng: state.map.markerLatLng,
  mapCentre: state.map.mapCentre,
  mapZoom: state.map.mapZoom,
  numOfMarkers: state.map.numOfMarkers,
  bounds: state.map.bounds,
  address: state.map.address,
  markerAddress: state.map.markerAddress,
  isOpen: state.map.open,
  redirect: state.map.redirect,
  popstate: state.map.popstate,
  isUpdateLocation: state.map.isUpdateLocation,
  isLogin: state.user.userLogin,
  mapBoards: state.mapBoards.mapBoards,
  map: state.googleMap.map,
  board: state.mapBoards.board,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  mapBoardsDataSet: (boards: any) => dispatch(mapBoardsDataSet(boards)),
  addAddress: (address: any) => dispatch(addAddress(address)),
  addMap: (map: any) => dispatch(addMap(map)),
  resetFindLocation: () => dispatch(resetFindLocation()),
  getAllBoards: () => dispatch(getAllBoards()),
  getBoardsByPoint: (latLng: any) => dispatch(getBoardsByPoint(latLng)),
  resetRedirect: () => dispatch(resetRedirect()),
  resetSearch: () => {
    dispatch(resetMarker());
    dispatch(resetMapBoardsData());
  },
  resetMarker: () => dispatch(resetMarker()),
  resetPopstate: (boardAddress: any, boardLatLng: any) => dispatch(resetPopstate(boardAddress, boardLatLng)),
  closeDrawer: () => dispatch(closeDrawer()),
  openDrawer: () => dispatch(openDrawer()),
  resetAddress: () => dispatch(resetAddress()),
  addPlaceListener: (placeListener: any) => dispatch(addPlaceListener(placeListener)),
  addMarker: (marker: any) => dispatch(addMarker(marker)),
  addLatLng: (latLng: any) => dispatch(addLatLng(latLng)),
  // addMarkerLatLng: (latLng: any) => dispatch(addMarkerLatLng(latLng)),
  updateLocation: (address: string, latLng: any, marker: any) => {
    dispatch(updateLocation(address, latLng));
    dispatch(addMarker(marker));
    dispatch(addMarkerLatLng(latLng));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMapService);
