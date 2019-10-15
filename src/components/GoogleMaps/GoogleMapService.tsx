import React, {useCallback, useEffect, useRef, useState} from "react";
import clsx from 'clsx';
import {GoogleMap} from "@react-google-maps/api";
import boards from '../../board'
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {addBoards, addMarkers, closeDrawer, openDrawer, resetSearch, updateLocation} from "../../store/actions/action.mapReducer";
import useStyles from "./useStyles";
import {isBoardCloseToUser} from "./isBoardCloseToUser";
import MapResultDrawer from "./MapResultDrawer";
import {addMarker} from "./addMarker";
import AutoCompleteInput from "./AutoCompleteInput";
import {autocompleteInit} from "./autocompleteInit";
import AutocompleteInputDialog from "./AutocompleteInputDialog";
import {findGeolocation} from "./findGeolocation";

declare global {
  interface Window { google: any; }
}

window.google = window.google || {};

interface IProps {
  marker: any
  resetSearch: Function
  mapBoards: any
  addMarkers: Function
  latLng: any
  addBoards: Function
  updateLocation: Function
  openDrawer: Function
  closeDrawer: Function
  address: string
  isOpen: boolean
}

const GoogleMapService: React.FC<IProps> = ({ marker, resetSearch, mapBoards, addMarkers, latLng, addBoards, updateLocation, address, isOpen, openDrawer, closeDrawer }) => {
  // const [zoom, setZoom] = useState(11);
  const [autocompleteInput, setAutocompleteInput] = useState(false);
  const [openAutocompleteInputDialog, setOpenAutocompleteInputDialog] = useState(false);
  const [clearButton, setClearButton] = useState(false);
  const autocompleteBoxRef = useRef(null);
  const mapRef = useRef(null);
  const classes = useStyles();
  const maps = window.google.maps;

  useEffect(() => {
    if (!clearButton && marker.length !== 0) {
      marker.map((marker: any) => marker.setMap(null));
      resetSearch();
      setAutocompleteInput(false);
    }
  }, [clearButton]);

  useEffect(() => {
    if (mapBoards.length !== 0) {
      const map = (mapRef.current as any).state.map;
      const markers: any = [];
      mapBoards.map((board: any) => {
        if (isBoardCloseToUser(board, latLng)) {
          const place = {name: board.name, location: board.latLng}
          const marker = addMarker(place, map, maps);
          markers.push(marker);
        }
      });
      addMarkers(markers)
    }
  }, [mapBoards]);

  const onLoad = useCallback(
    function onLoad(map: any) {
      map.setOptions({
        disableDefaultUI: true
      });
      findGeolocation(map, maps);
      autocompleteInit(map, autocompleteBoxRef, maps, marker, handleAutocompleteInputDialogOpen, updateLocation, setAutocompleteInput, getBoards);
    }, []
  );

  const handleAutocompleteInputDialogOpen = () => {
    setOpenAutocompleteInputDialog(true);
  };

  const handleAutocompleteInputDialogClose = () => {
    setOpenAutocompleteInputDialog(false);
  };

  const getBoards = (latLng: any) => {
    // fetch("/api/boards/latLng")
    //   .then()
    addBoards(boards);
  };

  // const onBoundsChanged = useCallback(
  //   function onBoundsChanged() {
  //     const map = (mapRef.current as any).state.map;
  //     (searchBoxRef.current as any).state.searchBox.setBounds(map.getBounds())
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
      {openAutocompleteInputDialog &&
      <AutocompleteInputDialog openAutocompleteInputDialog={openAutocompleteInputDialog} handleAutocompleteInputDialogClose={handleAutocompleteInputDialogClose}/>
      }
      <MapResultDrawer mapRef={mapRef}/>
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
        {console.log("Latitude and longitude:", {latLng})}
        <AutoCompleteInput autocompleteBoxRef={autocompleteBoxRef} setClearButton={setClearButton} autocompleteInput={autocompleteInput} clearButton={clearButton}/>
      </GoogleMap>
    </div>

  );
};

const mapStateToProps = (state: any) => ({
  marker: state.map.marker,
  mapBoards: state.map.mapBoards,
  latLng: state.map.latLng,
  address: state.map.address,
  isOpen: state.map.open,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetSearch: () => dispatch(resetSearch()),
  closeDrawer: () => dispatch(closeDrawer()),
  openDrawer: () => dispatch(openDrawer()),
  addMarkers: (marker: any) => dispatch(addMarkers(marker)),
  addBoards: (mapBoards: any) => dispatch(addBoards(mapBoards)),
  updateLocation: (address: string, latLng: any, marker: any) => dispatch(updateLocation(address, latLng, marker)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMapService);
