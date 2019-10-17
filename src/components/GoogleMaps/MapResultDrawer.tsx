import React, {useState} from "react";
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Divider,
  Drawer,
  IconButton,
  TextField,
  useTheme
} from "@material-ui/core";
import {List} from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {closeDrawer} from "../../store/actions/action.mapReducer";
import useStyles from "./useStyles";
import {boardsAtThisLocation, boardsCloseToThisLocation} from "./boardsList";
import AddBoard from "./AddBoard";
import AddNewBoard from "./AddNewBoard";

interface IProps {
  mapBoards: any
  latLng: any
  closeDrawer: Function
  address: string
  isOpen: boolean
  isLogin: boolean
  mapRef: any
}

const MapResultDrawer: React.FC<IProps> = ({ mapRef, mapBoards, latLng, address, isOpen, closeDrawer, isLogin }) => {
  // const [login, setlogin] = useState(true);
  const [openNewBoard, setOpenNewBoard] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  const handleNewBoardOpen = () => {
    setOpenNewBoard(true);
  };

  const handleNewBoardClose = () => {
    setOpenNewBoard(false);
  };
  
  return (
    <div className={classes.root}>
      {openNewBoard &&
      <AddNewBoard mapRef={mapRef} handleNewBoardClose={handleNewBoardClose} openNewBoard={openNewBoard} address={address}/>
      }
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={isOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <h3 style={{alignSelf: "flex-start", alignContent: "center"}}>{address}</h3>
          <IconButton onClick={() => closeDrawer()}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        {isLogin && 
        <AddBoard handleNewBoardOpen={handleNewBoardOpen}/>
        }
        <h4>Boards at this location:</h4>
        <List>
          {boardsAtThisLocation(mapBoards, latLng)}
        </List>
        <Divider />
        <h4>Boards close to this location:</h4>
        <List>
          {boardsCloseToThisLocation(mapBoards, latLng)}
        </List>
      </Drawer>
    </div>

  );
};

const mapStateToProps = (state: any) => ({
  mapBoards: state.map.mapBoards,
  latLng: state.map.latLng,
  address: state.map.address,
  isOpen: state.map.open,
  isLogin: state.login.isLogin,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeDrawer: () => dispatch(closeDrawer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapResultDrawer);
