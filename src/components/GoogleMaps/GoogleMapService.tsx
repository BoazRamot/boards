import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  TextField,
  Theme,
  useTheme,
} from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { GoogleMap } from '@react-google-maps/api';
import clsx from 'clsx';
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import boards from '../../board';

declare global {
  // tslint:disable-next-line: interface-name
  interface Window {
    google: any;
  }
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
      width: '30vw',
      [theme.breakpoints.down('sm')]: {
        width: '40vw',
      },
      [theme.breakpoints.down('xs')]: {
        width: '80vw',
      },
      display: 'flex',
      alignItems: 'center',
      padding: `0 12px`,
      textOverflow: `ellipses`,
      position: 'absolute',
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
      display: 'flex',
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

const mapDrawerReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      console.log('action', action);
      return {
        ...state,
        address: action.address,
        latLng: action.latLng,
        open: true,
        marker: [action.marker],
      };
    case 'OPEN_DRAWER':
      return {
        ...state,
        open: true,
      };
    case 'CLOSE_DRAWER':
      return {
        ...state,
        open: false,
      };
    case 'RESET_SEARCH':
      return {
        ...state,
        marker: [],
        mapBoards: [],
      };
    case 'ADD_MARKERS':
      return {
        ...state,
        marker: [...state.marker, ...action.marker],
      };
    case 'MAP_BOARDS':
      return {
        ...state,
        mapBoards: [...state.mapBoards, ...action.mapBoards],
      };
    default:
      throw new Error();
  }
};

const initialMapDrawerState = {
  address: '',
  latLng: {},
  open: false,
  marker: [],
  mapBoards: [],
};

const GoogleMapService: React.FC = () => {
  const [lat] = useState(32.109333);
  const [lng] = useState(34.855499);
  // const [] = useState(11);
  const [autocompleteInput, setAutocompleteInput] = useState(false);
  // const [marker, setMarker] = useState();
  // const [] = useState();
  const [login] = useState(true);
  const [openNewBoard, setOpenNewBoard] = useState(false);
  const [
    openAutocompleteInputDialog,
    setOpenAutocompleteInputDialog,
  ] = useState(false);
  const [clearButton, setClearButton] = useState(false);
  // const [mapBoards, setMapBoards] = useState();
  const [drawerOption, dispatchDrawerOption] = useReducer(
    mapDrawerReducer,
    initialMapDrawerState,
  );
  const autocompleteBoxRef = useRef(null);
  const mapRef = useRef(null);

  const classes = useStyles();
  const theme = useTheme();
  const [open] = useState(false);
  const maps = window.google.maps;

  const handleDrawerClose = () => {
    dispatchDrawerOption({ type: 'CLOSE_DRAWER' });
  };

  const handleDrawerOpen = () => {
    if (!clearButton) {
      return;
    }
    // if (drawerOption.location === '') return;
    // if (clearButton) return;
    // const input = e.target.parentNode.parentNode.parentNode.querySelector('input');
    // input.value = drawerOption.location;
    dispatchDrawerOption({ type: 'OPEN_DRAWER' });
  };

  const handleNewBoardOpen = () => {
    setOpenNewBoard(true);
  };

  const handleNewBoardClose = () => {
    setOpenNewBoard(false);
  };

  // const handleAutocompleteInputDialogOpen = () => {
  //   setOpenAutocompleteInputDialog(true);
  // };

  const handleAutocompleteInputDialogClose = () => {
    setOpenAutocompleteInputDialog(false);
  };

  const handleInput = () => {
    const input = (autocompleteBoxRef.current as any).querySelector('input')
      .value;
    if (input.length !== 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
  };

  const handleClear = () => {
    const input = (autocompleteBoxRef.current as any).querySelector('input')
      .value;
    console.log('input', input);
    if (input === null) {
      return;
    }
    (autocompleteBoxRef.current as any).querySelector('input').value = '';
    setClearButton(false);
  };

  useEffect(() => {
    console.log('useEffect drawerOption', drawerOption);
    console.log('clearButton', clearButton);
    if (!clearButton && drawerOption.marker.length !== 0) {
      console.log('clearButton if', clearButton);
      console.log('drawerOption.marker', drawerOption.marker);
      // eslint-disable-next-line
      drawerOption.marker.map((marker: any) => {
        console.log(marker);
        marker.setMap(null);
      });
      dispatchDrawerOption({ type: 'RESET_SEARCH' });
      setAutocompleteInput(false);
    }
  }, [clearButton, drawerOption]);

  useEffect(() => {
    // let markers = [];
    // Clear out the old markers.
    // markers.forEach(function(marker) {
    //   marker.setMap(null);
    // });
    // markers = [];

    if (drawerOption.mapBoards.length !== 0) {
      const map = (mapRef.current as any).state.map;
      const markers: any = [];
      // eslint-disable-next-line
      drawerOption.mapBoards.map((board: any) => {
        if (isBoardCloseToUser(board)) {
          const place = { name: board.name, location: board.latLng };
          const marker = addMarker(place, map);
          markers.push(marker);
        }
      });
      dispatchDrawerOption({ type: 'ADD_MARKERS', marker: markers });
    }
    // eslint-disable-next-line
  }, [drawerOption.mapBoards]);

  const isBoardCloseToUser = (board: any) => {
    let result = false;
    const latLngBounds = 0.0022;
    const x = Math.abs(board.latLng.lat - drawerOption.latLng.lat);
    const y = Math.abs(board.latLng.lng - drawerOption.latLng.lng);
    if (x < latLngBounds && y < latLngBounds) {
      result = true;
    }
    return result;
  };

  const onLoad = useCallback((map: any) => {
    console.log('onLoad');
    map.setOptions({
      disableDefaultUI: true,
    });
    findGeolocation(map);
    autocomplete(map);
    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line
  const getBoards = () => {
    // fetch("/api/boards/latLng")
    //   .then()
    dispatchDrawerOption({ type: 'MAP_BOARDS', mapBoards: boards });
  };

  const autocomplete = (map: any) => {
    const input = (autocompleteBoxRef.current as any).querySelector('input');
    const boundAutocompleteInput = new maps.places.Autocomplete(input);
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    boundAutocompleteInput.bindTo('bounds', map);
    boundAutocompleteInput.setFields([
      'address_components',
      'geometry',
      'icon',
      'name',
    ]);
  };

  const autocompleteInputDialog = () => {
    return (
      <div>
        <Dialog
          open={openAutocompleteInputDialog}
          onClose={handleAutocompleteInputDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">PAY ATTENTION</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Choose Location From The Drop Down List
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleAutocompleteInputDialogClose}
              color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const addMarker = (place: any, map: any) => {
    const marker = new window.google.maps.Marker({
      map,
      // icon: icon,
      title: place.name,
      // position: place.geometry.location
      position: place.location,
    });
    return marker;
  };

  // const onBoundsChanged = useCallback(
  //   function onBoundsChanged() {
  //     const map = (mapRef.current as any).state.map;
  //     (searchBoxRef.current as any).state.searchBox.setBounds(map.getBounds())
  //   }, []
  // );

  const findGeolocation = (map: any) => {
    const infoWindow = new window.google.maps.InfoWindow();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const bounds = new window.google.maps.LatLngBounds();
          const latLngBounds = 0.001348;
          // const latLngBounds = 0.002200;
          bounds.ja = {
            g: longitude - latLngBounds,
            h: longitude + latLngBounds,
          };
          bounds.na = {
            g: latitude - latLngBounds,
            h: latitude + latLngBounds,
          };
          // infoWindow.setPosition({lat: latitude, lng: longitude});
          // infoWindow.setContent('Location found.');
          // infoWindow.open(map);
          map.setCenter({ lat: latitude, lng: longitude });
          map.setZoom(16);
          // reverseGeocoding(map, {lat: latitude, lng: longitude});
          // map.fitBounds(bounds);
          // getBoards();
        },
        () => {
          handleLocationError(true, infoWindow, map);
        },
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map);
    }
  };

  const handleLocationError = (
    browserHasGeolocation: boolean,
    infoWindow: any,
    map: any,
  ) => {
    infoWindow.setPosition(map.getCenter());
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : 'Error: Your browser doesn\'t support geolocation.',
    );
    infoWindow.open(map);
  };

  const handleClick = (e: any) => {
    // reverseGeocoding(latLng)
  };

  const addBoard = () => {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleNewBoardOpen}>
          Add Board To This Location
        </Button>
        <Divider />
      </div>
    );
  };

  const newFormDialog = () => {
    return (
      <div>
        <Dialog
          open={openNewBoard}
          onClose={handleNewBoardClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>Board Name</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Board Name"
              type="text"
              fullWidth
              defaultValue={drawerOption.location}
            />
            <br />
            <Divider />
            <br />
            <DialogContentText>Board Address</DialogContentText>
            <TextField
              margin="dense"
              id="address"
              label="Address"
              type="text"
              fullWidth
              value={drawerOption.location}
            />
            <br />
            <Divider />
            <br />
            <DialogContentText>Board Description</DialogContentText>
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              placeholder="Enter Board Description"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNewBoardClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={sendNewBoard}>
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
      address,
      description,
      // id: 1,
      // postsId: 1
    };
    console.log(board);
    handleNewBoardClose();
  };

  const boardsAtThisLocation = () => {
    const list = drawerOption.mapBoards.filter(
      (board: any) =>
        board.latLng.lat === drawerOption.latLng.lat &&
        board.latLng.lng === drawerOption.latLng.lng,
    );
    return boardsList(list);
  };

  const boardsCloseToThisLocation = () => {
    const list = drawerOption.mapBoards.filter(
      (board: any) =>
        board.latLng.lat !== drawerOption.latLng.lat &&
        board.latLng.lng !== drawerOption.latLng.lng,
    );
    // eslint-disable-next-line
    const newList = list.filter((board: any) => {
      if (isBoardCloseToUser(board)) {
        return board;
      }
    });
    return boardsList(newList);
  };

  const boardsList = (list: any) => {
    return (
      <div>
        {list &&
          list.map((board: any, index: any) => (
            <ListItem button key={index}>
              <ListItemText>{board.name}</ListItemText>
            </ListItem>
          ))}
      </div>
    );
  };

  return (
    <div className={classes.root}>
      {openNewBoard && newFormDialog()}
      {openAutocompleteInputDialog && autocompleteInputDialog()}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        // open={open}
        open={drawerOption.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          {/*<h3 style={{alignSelf: "flex-start", alignContent: "center"}}>{location}</h3>*/}
          <h3 style={{ alignSelf: 'flex-start', alignContent: 'center' }}>
            {drawerOption.address}
          </h3>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {login && addBoard()}
        <h4>Boards at this location:</h4>
        <List>{boardsAtThisLocation()}</List>
        <Divider />
        <h4>Boards close to this location:</h4>
        <List>{boardsCloseToThisLocation()}</List>
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
        onClick={handleClick}
        onLoad={onLoad}
        // onBoundsChanged={onBoundsChanged}
      >
        {console.log('Latitude and longitude:', { lat, lng })}
        {/*<Paper className={classes.paperRoot}>*/}
        <Paper className={drawerOption.open ? classes.hide : classes.paperRoot}>
          <InputBase
            className={classes.input}
            ref={autocompleteBoxRef}
            placeholder="Search Google Maps"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={handleInput}
            disabled={autocompleteInput}
          />
          <IconButton
            className={clearButton ? classes.iconButton : classes.hide}
            aria-label="clear"
            onClick={handleClear}
          >
            <ClearIcon />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            className={classes.iconButton}
            aria-label="search"
            onClick={handleDrawerOpen}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </GoogleMap>
    </div>
  );
};

export default GoogleMapService;
