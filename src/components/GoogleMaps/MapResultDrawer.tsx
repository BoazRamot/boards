import React, {useEffect, useState} from "react";
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
import useStyles from "./GoogleMapService/useStyles";
import {boardsAtThisLocation, boardsCloseToThisLocation} from "./boardsList";
import AddBoard from "./AddBoard";
import AddNewBoard from "./AddNewBoard";
import {createNewBoard} from "../../store/actions/action.mapApiMiddleware";

interface IProps {
  mapBoards: any
  latLng: any
  markerLatLng: any
  closeDrawer: Function
  createNewBoard: any
  address: string
  isOpen: boolean
  isLogin: boolean
  redirect: boolean
}

const MapResultDrawer: React.FC<IProps> = ({ redirect, markerLatLng, createNewBoard, mapBoards, latLng, address, isOpen, closeDrawer, isLogin }) => {
  // const [login, setlogin] = useState(true);
  const [openNewBoard, setOpenNewBoard] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  // let location = latLng;
  //
  // useEffect(() => {
  //   if (redirect) {
  //     location = markerLatLng;
  //   }
  // }, [redirect])

  const handleNewBoardOpen = () => {
    setOpenNewBoard(true);
  };

  const handleNewBoardClose = () => {
    setOpenNewBoard(false);
  };
  
  return (
    <div className={classes.root}>
      {openNewBoard &&
      <AddNewBoard createNewBoard={createNewBoard}
                   latLng={latLng}
                   handleNewBoardClose={handleNewBoardClose}
                   openNewBoard={openNewBoard}
                   address={address}
      />}
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
          {boardsAtThisLocation(mapBoards, (redirect ? markerLatLng : latLng))}
        </List>
        <Divider />
        <h4>Boards close to this location:</h4>
        <List>
          {boardsCloseToThisLocation(mapBoards, (redirect ? markerLatLng : latLng))}
        </List>
      </Drawer>
    </div>

  );
};

const mapStateToProps = (state: any) => ({
  mapBoards: state.mapBoards,
  latLng: state.map.latLng,
  markerLatLng: state.map.markerLatLng,
  address: state.map.address,
  isOpen: state.map.open,
  redirect: state.map.redirect,
  isLogin: state.user.userLogin,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeDrawer: () => dispatch(closeDrawer()),
  createNewBoard: (board: any) => dispatch(createNewBoard(board)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapResultDrawer);
