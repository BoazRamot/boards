import React, {useCallback, useEffect, useRef, useState} from "react";
import clsx from 'clsx';
import {GoogleMap} from "@react-google-maps/api";
import {
  Button,
  createStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  makeStyles,
  Paper, TextField,
  Theme,
  useTheme
} from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

declare global {
  interface Window { google: any; }
}

window.google = window.google || {};

const drawerWidth = '35vw';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'calc(100vh - 72px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paperRoot: {
      // width: 400,
      width: '30vw',
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
      height: 'calc(100% - 64px)',
      top: 64,
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
      alignSelf: 'stretch',
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: '-' + drawerWidth,
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
  const [login, setlogin] = useState(true);
  const [openNewBoard, setOpenNewBoard] = useState(false);
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

  const handleNewBoardOpen = () => {
    setOpenNewBoard(true);
  };

  const handleNewBoardClose = () => {
    setOpenNewBoard(false);
  };

  useEffect(() => {

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
    autocompleteInput.addListener('place_changed', function search() {
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
  const addBoard = () => {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleNewBoardOpen}>
          Add Board To This Location
        </Button>
        <Divider />
      </div>
    )
  };

  const newFormDialog = () => {
    return (
      <div>
        <Dialog open={openNewBoard} onClose={handleNewBoardClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Board Name
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Board Name"
              type="text"
              fullWidth
              defaultValue={location}
            />
            <br/>
            <Divider />
            <br/>
            <DialogContentText>
              Board Address
            </DialogContentText>
            <TextField
              margin="dense"
              id="address"
              label="Address"
              type="text"
              fullWidth
              value={location}
            />
            <br/>
            <Divider />
            <br/>
            <DialogContentText>
              Board Description
            </DialogContentText>
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              placeholder='Enter Board Description'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNewBoardClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={(event) => {sendNewBoard(event)}}>
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const sendNewBoard = (event: any) => {
    const form = event.target.parentNode.parentNode.parentNode;
    const name = form.querySelector('#name').value;
    const address = form.querySelector('#address').value;
    const description = form.querySelector('#description').value;
    console.log(name);
    console.log(address);
    const map = (mapRef.current as any).state.map;
    const latLng = { lat: map.center.lat(), lng: map.center.lng() };
    const board = {
      latLng,
      name,
      address: location,
      description
      // id: 1,
      // postsId: 1
    };
    console.log(board);
    handleNewBoardClose();
  };

  return (
    <div className={classes.root}>
      {openNewBoard && newFormDialog()}
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
        {login && addBoard()}
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
        <Paper className={classes.paperRoot}>
          <InputBase
            className={classes.input}
            ref={autocompleteBoxRef}
            placeholder="Search Google Maps"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton className={classes.iconButton} aria-label="search"
                      onClick={(event: any) => {
                        const input = event.target.parentNode.parentNode.parentNode.querySelector('input');
                        if (input === null) return;
                        if (!open) {
                          // handleDrawerOpen();
                          const map = (mapRef.current as any).state.map;
                          console.log(map)
                          // const val = input.value;
                          // input.value = '';
                          // input.value = val;
                        }
                        // input.value = '';
                        // const val = event.target.parentNode.parentNode.parentNode.querySelector('input').value;
                        // event.target.parentNode.parentNode.parentNode.querySelector('input').value = '';
                        // event.target.parentNode.parentNode.parentNode.querySelector('input').value = val;
                      }}>
            <SearchIcon />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton className={classes.iconButton} aria-label="clear"
                      onClick={(event: any) => {
                        const input = event.target.parentNode.parentNode.parentNode.querySelector('input');
                        if (input === null) return;
                        input.value = '';
                      }}>
            <ClearIcon />
          </IconButton>
        </Paper>
      </GoogleMap>
    </div>

  );
};

export default GoogleMapService;
