import React, {useState} from 'react';
import {
  AppBar,
  Button,
  createStyles,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider,
  IconButton,
  makeStyles, Menu, MenuItem,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import Link from "@material-ui/core/Link";
import {Link as RouterLink} from 'react-router-dom';

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

const Header = () => {
  const [openAutocompleteInputDialog, setOpenAutocompleteInputDialog] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleAutocompleteInputDialogOpen = () => {
    setOpenAutocompleteInputDialog(true);
  };

  const handleAutocompleteInputDialogClose = () => {
    setOpenAutocompleteInputDialog(false);
  };

  const handleGoogle = () => {
    window.location.href = `http://localhost:5000/api/auth/google`;
  };

  const loginDialog = () => {
    return (
      <div>
        <Dialog open={openAutocompleteInputDialog} onClose={handleAutocompleteInputDialogClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Logging With</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Choose a service to logon with
            </DialogContentText>
            <DialogContentText>
              <a href={'http://localhost:5000/api/auth/google'} >google a </a>
              <Button onClick={handleGoogle} color="primary">
                google
              </Button>
            </DialogContentText>
            <DialogContentText>
              <Button onClick={handleAutocompleteInputDialogClose} color="primary">
                FaceBook
              </Button>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAutocompleteInputDialogClose} color="primary">
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

  return (
    <div className={classes.root}>
      {openAutocompleteInputDialog && loginDialog()}
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Boards
          </Typography>
          <Button color="inherit" onClick={handleAutocompleteInputDialogOpen}>Login</Button>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
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
            <MenuItem onClick={handleAutocompleteInputDialogOpen}>Login</MenuItem>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  )
};

export default Header;
