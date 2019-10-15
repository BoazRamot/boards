import {createStyles, makeStyles, Theme} from "@material-ui/core";

const drawerWidth = '35vw';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'calc(100vh - 72px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paperRoot: {
      width: '30vw',
      [theme.breakpoints.down('sm')]: {
        width: '40vw',
      },
      [theme.breakpoints.down('xs')]: {
        width: '80vw',
      },
      display: 'flex',
      alignItems: 'center',
      padding: `0 12px`,
      textOverflow: `ellipses`,
      position: "absolute",
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      height: 'calc(100% - 64px)',
      top: 64,
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      display: "flex",
      flex: 1,
      alignSelf: 'stretch',
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: '-' + drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

export default useStyles;