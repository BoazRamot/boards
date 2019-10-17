import React, {useEffect, useState} from 'react';
import {
  AppBar, Avatar,
  Button,
  createStyles,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  IconButton,
  makeStyles, Menu, MenuItem,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Dispatch} from "redux";
import {userLogin, userLogout} from "../store/actions/action.loginReducer";
import {connect} from "react-redux";
import {resetRedirect, setRedirect} from "../store/actions/action.mapReducer";
import {saveMapState} from "./localStorage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      position:'fixed',
      left:0,
      top:0,
    },
  }),
);

interface IProps {
  isOpen: boolean
  redirect: boolean
  isLogin: boolean
  userName: string
  Id: string
  avatar: string
  address: string
  latLng: any
  mapBoards: any
  marker: any
  userLogout: Function
  setRedirect: Function
  resetRedirect: Function
}

const Header: React.FC<IProps> = ({ resetRedirect, marker, latLng, address, mapBoards, isOpen, setRedirect, redirect, isLogin, avatar, Id, userName, userLogout }) => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  useEffect(() => {
    if (redirect && !isLogin) {
      try {
        const serializedState = JSON.stringify({address, latLng, mapBoards});
        localStorage.setItem('boards-map-state', serializedState);
      } catch (err) {
        console.log('setItem err', err);
        // ignore write errors
      }
      window.location.href = `http://localhost:5000/api/auth/google`;
    }
    return () => {
      // clearInterval(google);
    }
  }, [redirect, isLogin]);

  const handleLoginDialogOpen = () => {
    setOpenLoginDialog(true);
  };

  const handleLoginDialogClose = () => {
    setOpenLoginDialog(false);
  };

  const handleGoogle = () => {
    setRedirect(latLng);
  };

  const loginDialog = () => {
    return (
      <div>
        <Dialog open={openLoginDialog} onClose={handleLoginDialogClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Logging With</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Choose a service to logon with
            </DialogContentText>
            <DialogContentText>
              <Button onClick={handleGoogle} color="primary">
                google
              </Button>
            </DialogContentText>
            <DialogContentText>
              <Button onClick={handleLoginDialogClose} color="primary">
                FaceBook
              </Button>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLoginDialogClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('boards-token');
    userLogout();
    resetRedirect();
  };

  return (
    <div className={classes.root}>
      {openLoginDialog && loginDialog()}
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Boards
          </Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            {isLogin ? <Avatar alt={userName} src={avatar} /> : <AccountCircle />}
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            {isLogin ? <MenuItem onClick={handleLogout}>Logout</MenuItem> : <MenuItem onClick={handleLoginDialogOpen}>Login</MenuItem>}
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  )
};

const mapStateToProps = (state: any) => ({
  isLogin: state.login.isLogin,
  userName: state.user.userName,
  Id: state.user.Id,
  avatar: state.user.avatar,
  redirect: state.map.redirect,
  isOpen: state.map.open,
  address: state.map.address,
  latLng: state.map.latLng,
  mapBoards: state.map.mapBoards,
  marker: state.map.marker,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetRedirect: () => dispatch(resetRedirect()),
  userLogout: () => dispatch(userLogout()),
  setRedirect: (latLng: any) => dispatch(setRedirect(latLng)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
