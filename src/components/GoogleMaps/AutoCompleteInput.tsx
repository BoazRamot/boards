import React, {useEffect} from "react";
import {Divider, IconButton, InputBase, Paper} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {openDrawer} from "../../store/actions/action.mapReducer";
import useStyles from "./useStyles";
import {store} from "../../index";

interface IProps {
  openDrawer: Function
  isOpen: boolean
  autocompleteBoxRef: any
  setClearButton: any
  autocompleteInput: boolean
  clearButton: boolean
  redirect: boolean
  address: string
}

const AutoCompleteInput: React.FC<IProps> = ({ address, redirect, isOpen, openDrawer, autocompleteBoxRef, setClearButton, autocompleteInput, clearButton }) => {
  const classes = useStyles();
  console.log('AutoCompleteInput useEffect autocompleteBoxRef', autocompleteBoxRef)

  useEffect(() => {

    console.log('AutoCompleteInput useEffect', redirect)
    if (redirect) {

      (autocompleteBoxRef.current as any).querySelector('input').value = address;
      setClearButton(true);
      // (autocompleteBoxRef.current as any).querySelector('input').focus();
      console.log('AutoCompleteInput useEffect autocompleteBoxRef', autocompleteBoxRef)
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
    setClearButton(false);
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
          // defaultValue={redirect ? address : null}

        />
        <IconButton className={clearButton ? classes.iconButton : classes.hide}
                    aria-label="clear"
                    onClick={handleClear}
        >
          <ClearIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton className={classes.iconButton} aria-label="search"
                    onClick={() => {
                      if (!clearButton) return;
                      // if (drawerOption.location === '') return;
                      // if (clearButton) return;
                      // const input = e.target.parentNode.parentNode.parentNode.querySelector('input');
                      // input.value = drawerOption.location;
                      // dispatchDrawerOption({type: 'OPEN_DRAWER'})
                      openDrawer()
                    }}>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteInput);
