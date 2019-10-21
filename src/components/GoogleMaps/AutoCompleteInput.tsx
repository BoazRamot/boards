import React, {useEffect} from "react";
import {Divider, IconButton, InputBase, Paper} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import LocationOffIcon from '@material-ui/icons/LocationOff';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {
  openDrawer,
  resetAddress,
  resetFindLocation,
  resetRedirect,
  setFindLocation
} from "../../store/actions/action.mapReducer";
import useStyles from "./GoogleMapService/useStyles";
import {findGeolocation} from "../../helpers/GoogleMaps/findGeolocation";

interface IProps {
  resetFindLocation: Function
  setFindLocation: Function
  openDrawer: Function
  resetAddress: Function
  isOpen: boolean
  autocompleteBoxRef: any
  setClearButton: any
  autocompleteInput: boolean
  findLocation: boolean
  clearButton: boolean
  redirect: boolean
  address: string
  map: any
  setAutocompleteInput: any
}

const AutoCompleteInput: React.FC<IProps> = ({ setAutocompleteInput, resetFindLocation, findLocation, setFindLocation, map, resetAddress, address, redirect, isOpen, openDrawer, autocompleteBoxRef, setClearButton, autocompleteInput, clearButton }) => {
  const classes = useStyles();

  useEffect(() => {
    if (redirect && address) {
      (autocompleteBoxRef.current as any).querySelector('input').value = address;
      setClearButton(true);
    }
  }, [redirect]);

  const handleInput = () => {
    const input = (autocompleteBoxRef.current as any).querySelector('input').value;
    if (input.length !== 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
  };

  const handleClear = () => {
    const input = (autocompleteBoxRef.current as any).querySelector('input').value;
    console.log('input', input)
    if (input === null) return;
    (autocompleteBoxRef.current as any).querySelector('input').value = '';
    resetAddress();
    setClearButton(false);
  };

  const handleSearch = () => {
    if (!clearButton) return;
    openDrawer();
  };

  const handleFindMyLocation = () => {
    findGeolocation(map, window.google.maps);
    handleClear();
  };

  const handleFindLocation = () => {
    if (findLocation) {
      map.setOptions({draggableCursor: undefined});
      resetFindLocation();
      setAutocompleteInput(false);
    } else {
      map.setOptions({ draggableCursor : "url(http://s3.amazonaws.com/besport.com_images/status-pin.png), auto" })
      setFindLocation();
      setAutocompleteInput(true);
      handleClear();
    }
  };
  
  return (
    <div>
      <Paper className={isOpen ? classes.hide : classes.paperRoot}>
        <InputBase
          className={classes.input}
          ref={autocompleteBoxRef}
          placeholder="Search Google Maps"
          inputProps={{ 'aria-label': 'search google maps' }}
          onChange={handleInput}
          disabled={autocompleteInput}
        />
        <IconButton className={clearButton ? classes.iconButton : classes.hide}
                    aria-label="clear"
                    onClick={handleClear}
        >
          <ClearIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton className={classes.iconButton}
                    aria-label="search"
                    onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton className={classes.iconButton}
                    aria-label="search"
                    onClick={handleFindMyLocation}>
          <MyLocationIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton className={classes.iconButton}
                    aria-label="location"
                    onClick={handleFindLocation}>
          {findLocation ? <LocationOffIcon /> : <AddLocationIcon /> }
        </IconButton>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  map: state.googleMap.map,
  isOpen: state.map.open,
  address: state.map.address,
  redirect: state.map.redirect,
  findLocation: state.map.findLocation,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openDrawer: () => dispatch(openDrawer()),
  resetAddress: () => dispatch(resetAddress()),
  setFindLocation: () => dispatch(setFindLocation()),
  resetFindLocation: () => dispatch(resetFindLocation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteInput);
