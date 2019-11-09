import {
  AppBar,
  Avatar,
  createStyles,
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
import { resetRedirectAction } from '../store/actions/action.mapReducer';
import {logoutUserAction, signInDialogOpenAction} from '../store/actions/action.userDataReducer';

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
  userLogin: boolean;
  userName: string;
  avatar: string;
  resetRedirect: Function;
  logoutUser: Function;
  signInDialogOpen: Function;
}

const Header: React.FC<IProps> = ({
                                    logoutUser,
                                    resetRedirect,
                                    userLogin,
                                    avatar,
                                    userName,
                                    signInDialogOpen
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleLoginDialogOpen = () => {
    signInDialogOpen();
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

  return (
    <div className={classes.root}>
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
            {userLogin ? (
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
            {userLogin ? (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            ) : (
              <MenuItem onClick={handleLoginDialogOpen}>Login</MenuItem>
            )}
            <MenuItem style={{display: userLogin ? '' : 'none'}} onClick={handleClose}>Profile</MenuItem>
            <MenuItem style={{display: userLogin ? '' : 'none'}} onClick={handleClose}>My account</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userLogin: state.user.userLogin,
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
  signInDialogOpen: () => dispatch(signInDialogOpenAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
