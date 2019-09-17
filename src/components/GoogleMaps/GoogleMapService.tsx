import React, {useCallback, useEffect, useRef, useState} from "react";
import clsx from 'clsx';
import {GoogleMap, InfoWindow, Marker} from "@react-google-maps/api";
import SearchBox from "./SearchBox";
import {
  createStyles,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Theme,
  useTheme
} from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from '@material-ui/icons/Search';

declare global {
  interface Window { google: any; }
}

window.google = window.google || {};

const drawerWidth = 500;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paperRoot: {
      width: 400,
      display: 'flex',
      alignItems: 'center',
      padding: `0 12px`,
      textOverflow: `ellipses`,
      position: "absolute",
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      display: "flex",
      flex: 1,
      height: `100vh`,
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

interface IProps {}

const GoogleMapService: React.FC<IProps> = ({  }) => {
  const [lat, setLat] = useState(32.109333);
  const [lng, setLng] = useState(34.855499);
  const [zoom, setZoom] = useState(11);
  // const [marker, setMarker] = useState();
  const [location, setLocation] = useState();
  const searchBoxRef = useRef(null);
  const autocompleteBoxRef = useRef(null);
  const mapRef = useRef(null);

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const maps = window.google.maps;

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  useEffect(() => {
    // const watchID = navigator.geolocation.watchPosition((position) => {
    //   console.log('watchID', position.coords.latitude, position.coords.longitude);
    //   const map = (mapRef.current as any).state.map;
    //   const { latitude, longitude } = position.coords;
    //   const bounds = new window.google.maps.LatLngBounds();
    //   bounds.ja = { g: longitude - 0.001348, h: longitude + 0.001348 };
    //   bounds.na = { g: latitude - 0.001348, h: latitude + 0.001348 };
    //   const infoWindow = new window.google.maps.InfoWindow;
    //   infoWindow.setPosition({lat: latitude, lng: longitude});
    //   infoWindow.setContent('Location found.');
    //   infoWindow.open(map);
    //   map.setCenter({lat: latitude, lng: longitude});
    //   // reverseGeocoding({lat, lng})
    //   map.fitBounds(bounds);
    //   // console.log('mapRef', (mapRef.current as any).state.map)
    // });
    // return () => {
    //   navigator.geolocation.clearWatch(watchID);
    // };
  }, []);

  const onLoad = useCallback(
    function onLoad(map: any) {
      map.setOptions({
        disableDefaultUI: true
      });
      findGeolocation(map);
      autocomplete(map);
    }, []
  );

  const getBoards = () => {

  };

  const autocomplete = (map: any) => {
    const input = (autocompleteBoxRef.current as any).querySelector('input');
    const autocompleteInput = new maps.places.Autocomplete(input);
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocompleteInput.bindTo('bounds', map);
    autocompleteInput.setFields(['address_components', 'geometry', 'icon', 'name']);
    autocompleteInput.addListener('place_changed', function() {
      // infowindow.close();
      // marker.setVisible(false);
      const place = autocompleteInput.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        console.log("No details available for input: '" + place.name + "'");
        return;
      }

      const icon = {
        url: place.icon,
        size: new window.google.maps.Size(71, 71),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(25, 25)
      };
      const { location, viewport } = place.geometry;
      if (location) {
        // const map = (mapRef.current as any).state.map;
        new window.google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        });
        map.fitBounds(viewport);
      }

      // If the place has a geometry, then present it on a map.
      // if (place.geometry.viewport) {
      //   map.fitBounds(place.geometry.viewport);
      // } else {
      //   map.setCenter(place.geometry.location);
      //   map.setZoom(17);  // Why 17? Because it looks good.
      // }
      // marker.setPosition(place.geometry.location);
      // marker.setVisible(true);

      let address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }
      console.log('address', address)
      console.log('place', place)

      // infowindowContent.children['place-icon'].src = place.icon;
      // infowindowContent.children['place-name'].textContent = place.name;
      // infowindowContent.children['place-address'].textContent = address;
      // infowindow.open(map, marker);
      handleDrawerOpen();
      setLocation(address);
      /*
      * send to server
      */

    });
  };

  // const onBoundsChanged = useCallback(
  //   function onBoundsChanged() {
  //     const map = (mapRef.current as any).state.map;
  //     (searchBoxRef.current as any).state.searchBox.setBounds(map.getBounds())
  //   }, []
  // );

  const findGeolocation = (map: any) => {
    const infoWindow = new window.google.maps.InfoWindow;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const { latitude, longitude } = position.coords;
        const bounds = new window.google.maps.LatLngBounds();
        const latLngBounds = 0.001348;
        // const latLngBounds = 0.002200;
        bounds.ja = { g: longitude - latLngBounds, h: longitude + latLngBounds };
        bounds.na = { g: latitude - latLngBounds, h: latitude + latLngBounds };
        infoWindow.setPosition({lat: latitude, lng: longitude});
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter({lat: latitude, lng: longitude});
        map.setZoom(16);
        // reverseGeocoding(map, {lat: latitude, lng: longitude});
        // map.fitBounds(bounds);
        // rev(latitude, longitude);
        getBoards();
      }, function() {
        handleLocationError(true, infoWindow, map);
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map);
    }
  };

  const handleLocationError = (browserHasGeolocation: boolean, infoWindow: any, map: any) => {
    infoWindow.setPosition(map.getCenter());
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  };

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

  const handleSearchBox = () => {
    console.log('searchBox', (searchBoxRef.current as any).state.searchBox)
    const places = (searchBoxRef.current as any).state.searchBox.getPlaces();
    console.log('places', places)
    // console.log('places', places[0].formatted_address)
    // search(places[0].formatted_address)
    if (places.length === 0) {
      return;
    }
    places.forEach(function(place: any) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      const icon = {
        url: place.icon,
        size: new window.google.maps.Size(71, 71),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(25, 25)
      };
      const { location, viewport } = place.geometry;
      if (location) {
        const map = (mapRef.current as any).state.map;
        new window.google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        });
        map.fitBounds(viewport);
      }
    });
  };

  const search = (search: any) => {
    console.log('search', search)
    // fetch(`https://nominatim.openstreetmap.org/?format=json&addressdetails=1&q=${search}&format=json&limit=1`)
    fetch(`https://nominatim.openstreetmap.org/?format=json&addressdetails=1&q=${search}&format=json`)
      .then(res => res.json())
      .then(myJson => {
        console.log(myJson);
        const map = (mapRef.current as any).state.map;
        const lat = +myJson[0].lat;
        const lon = +myJson[0].lon;
        const bounds = new window.google.maps.LatLngBounds();
        bounds.ja = { g: lon - 0.001348, h: lon + 0.001348 };
        bounds.na = { g: lat - 0.001348, h: lat + 0.001348 };
        const infoWindow = new window.google.maps.InfoWindow;
        infoWindow.setPosition({lat: lat, lng: lon});
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter({lat: lat, lng: lon});
        // reverseGeocoding({lat: latitude, lng: longitude});
        map.fitBounds(bounds);

        // console.log(myJson[0]);
        // let lat = +myJson[0].lat;
        // let lon = +myJson[0].lon;
        // console.log('myMap', myMap);
        // myMap.setView([lat, lon], 12);
      }).catch((e) => {
      console.error('Location Fetch failed', e)
    });
  };

  const rev = (lat: any, lng: any) => {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${lng}`)
      .then(res => res.json())
      .then(myJson => {
        console.log(myJson.features[0]);
        // console.log(myJson[0]);
        // let lat = +myJson[0].lat;
        // let lon = +myJson[0].lon;
        // console.log('myMap', myMap);
        // myMap.setView([lat, lon], 12);
      }).catch((e) => {
      console.error('Location Fetch failed', e)
    });
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <h3 style={{alignSelf: "flex-start", alignContent: "center"}}>{location}</h3>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <h4>Boards at this location:</h4>
        <h5>results</h5>
        <Divider />
        <h4>Boards close to this location:</h4>
        <h5>results</h5>
      </Drawer>
      <GoogleMap
        id="map"
        ref={mapRef}
        // zoom={zoom}
        // center={{lat, lng}}
        mapContainerClassName={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
        // mapContainerStyle={{
        //   display: "flex",
        //   flex: 1,
        //   height: `100vh`
        // }}
        onClick={e => handleClick(e)}
        onLoad={onLoad}
        // onBoundsChanged={onBoundsChanged}
      >
        {console.log("Latitude and longitude:", {lat, lng})}

        {/*<SearchBox handleSearchBox={handleSearchBox} searchBoxRef={searchBoxRef}/>*/}
        {/*{search("החשמונאים 15 תל אביב")}*/}
        {/*<input onChange={(e) => search(e.target.value)}*/}
        {/*       type="text"*/}
        {/*       placeholder="Search"*/}
        {/*       style={{*/}
        {/*         boxSizing: `border-box`,*/}
        {/*         border: `1px solid transparent`,*/}
        {/*         width: `240px`,*/}
        {/*         height: `32px`,*/}
        {/*         padding: `0 12px`,*/}
        {/*         borderRadius: `3px`,*/}
        {/*         boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,*/}
        {/*         fontSize: `14px`,*/}
        {/*         outline: `none`,*/}
        {/*         textOverflow: `ellipses`,*/}
        {/*         position: "absolute",*/}
        {/*         left: "50%",*/}
        {/*         marginLeft: "-120px"*/}
        {/*       }}*/}

        {/*/>*/}
        <Paper className={classes.paperRoot}>
          <InputBase
            className={classes.input}
            ref={autocompleteBoxRef}
            placeholder="Search Google Maps"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

      </GoogleMap>
    </div>

  );
};

export default GoogleMapService;
