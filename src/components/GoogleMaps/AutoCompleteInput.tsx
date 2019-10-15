import React from "react";
import {Divider, IconButton, InputBase, Paper} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {openDrawer} from "../../store/actions/action.mapReducer";
import useStyles from "./useStyles";

interface IProps {
  openDrawer: Function
  isOpen: boolean
  autocompleteBoxRef: any
  setClearButton: any
  autocompleteInput: boolean
  clearButton: boolean
}

const AutoCompleteInput: React.FC<IProps> = ({ isOpen, openDrawer, autocompleteBoxRef, setClearButton, autocompleteInput, clearButton }) => {
  const classes = useStyles();

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
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openDrawer: () => dispatch(openDrawer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteInput);
