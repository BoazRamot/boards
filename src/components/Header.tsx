import {
  AppBar,
  Avatar,
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { apiURL } from '../services/data.service';
import { resetRedirectAction } from '../store/actions/action.mapReducer';
import { logoutUserAction } from '../store/actions/action.userDataReducer';

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
      position: 'fixed',
      left: 0,
      top: 0,
    },
  }),
);

interface IProps {
  isLogin: boolean;
  userName: string;
  avatar: string;
  resetRedirect: Function;
  logoutUser: Function;
}

const Header: React.FC<IProps> = ({
  logoutUser,
  resetRedirect,
  isLogin,
  avatar,
  userName,
}) => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleLoginDialogOpen = () => {
    setOpenLoginDialog(true);
  };

  const handleLoginDialogClose = () => {
    setOpenLoginDialog(false);
  };

  const handleGoogle = () => {
    window.location.href = `${apiURL}/auth/google`;
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('boards-token');
    logoutUser();
    resetRedirect();
  };

  const loginDialog = () => {
    return (
      <div>
        <Dialog
          open={openLoginDialog}
          onClose={handleLoginDialogClose}
          aria-labelledby="form-dialog-title"
        >
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

  return (
    <div className={classes.root}>
      {openLoginDialog && loginDialog()}
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
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
            {isLogin ? (
              <Avatar alt={userName} src={avatar} />
            ) : (
              <AccountCircle />
            )}
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
            {isLogin ? (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            ) : (
              <MenuItem onClick={handleLoginDialogOpen}>Login</MenuItem>
            )}
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  isLogin: state.user.userLogin,
  userName: state.user.userData.name,
  avatar: state.user.userData.avatar,
  redirect: state.map.redirect,
  isOpen: state.map.open,
  address: state.map.address,
  mapBoards: state.mapBoards.mapBoards,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logoutUser: () => dispatch(logoutUserAction()),
  resetRedirect: () => dispatch(resetRedirectAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
