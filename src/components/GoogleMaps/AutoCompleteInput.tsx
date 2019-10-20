import React, {useEffect} from "react";
import {Divider, IconButton, InputBase, Paper} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {openDrawer, resetAddress, resetRedirect} from "../../store/actions/action.mapReducer";
import useStyles from "./GoogleMapService/useStyles";

interface IProps {
  openDrawer: Function
  resetAddress: Function
  isOpen: boolean
  autocompleteBoxRef: any
  setClearButton: any
  autocompleteInput: boolean
  clearButton: boolean
  redirect: boolean
  address: string
}

const AutoCompleteInput: React.FC<IProps> = ({ resetAddress, address, redirect, isOpen, openDrawer, autocompleteBoxRef, setClearButton, autocompleteInput, clearButton }) => {
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
      </Paper>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  isOpen: state.map.open,
  address: state.map.address,
  redirect: state.map.redirect,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openDrawer: () => dispatch(openDrawer()),
  resetAddress: () => dispatch(resetAddress()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteInput);
