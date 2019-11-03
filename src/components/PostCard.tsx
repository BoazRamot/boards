import React from 'react';
import {Card, CardContent, CardHeader, createStyles, Grid, Theme, Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {Link as RouterLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
// import {deletePost, imagesBaseURL} from '../services/posts.data.service';
// import {IPost} from '../models/IPost';
import CardMedia from '@material-ui/core/CardMedia';
import makeStyles from '@material-ui/core/styles/makeStyles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AddBoard from "./GoogleMaps/AddBoard";
import {boardsAtThisLocation, boardsCloseToThisLocation} from "./GoogleMaps/boardsList";
import logo from "../logo.svg";
import boardPin from "../boardPin.png";
import postNotePaperY from "../postNotePaperY.jpg";
import postNotePaperY2 from "../postNotePaperY2.jpg";
import CardActionArea from "@material-ui/core/CardActionArea";
import boardImg from "../boardImg.jpg";
import {Dispatch} from "redux";
import {logoutUser} from "../store/actions/action.userDataReducer";
import {resetRedirect} from "../store/actions/action.mapReducer";
import {connect} from "react-redux";

interface IProps {
  userName: any,
  avatar: any
  handleNewPostOpen: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    media: {
      height: 300,
      width: 'auto',
      margin: 'auto',
      marginTop: theme.spacing(2)
    },

    drawerRoot: {
      height: 'calc(100%)',
      display: "flex",
      flexDirection: "column",
      width: "80vw"
    },

    drawerHeader: {
      // width: `calc(${drawerWidth} - 8px)`,
      // position:'fixed',
      display: 'flex',
      flexFlow: 'row',
      alignItems: 'center',
      // padding: theme.spacing(0, 1),
      // ...theme.mixins.toolbar,
      justifyContent: 'space-between',
    },
    drawerHeaderButton: {
      alignSelf: 'center',
      padding: theme.spacing(1),
    },

  })
);

const PostCard: React.FC<IProps> = ({ handleNewPostOpen, userName, avatar }) => {
  const classes = useStyles();

  return (
    <div className={classes.drawerRoot}>
      {/*<div className={classes.drawerHeaderButton} style={{flexShrink: 0}}>*/}
      {/*  <Card>*/}
      {/*    <CardContent>*/}
      {/*      <Typography variant="h5" color="textSecondary" component="p">*/}
      {/*        Create A Post*/}
      {/*      </Typography>*/}
      {/*    </CardContent>*/}
      {/*    <CardHeader*/}
      {/*      avatar={ <Avatar alt={userName} src={avatar} /> }*/}
      {/*      title="Shrimp and Chorizo Paella"*/}
      {/*      subheader="September 14, 2016"*/}
      {/*    />*/}
      {/*  </Card>*/}
      {/*</div>*/}
      <Grid container style={{flexGrow: 1, display: "flex", flexDirection: "column", minHeight: 0}}>
        <Grid item
              style={{
                // backgroundColor: "default", flexGrow: 1, overflow: "auto", /*minHeight: 'calc(100%)'*/
              }}
        >
          <Box mb={2} ml={1}>
            <Card onClick={handleNewPostOpen} style={{cursor: "pointer"}}>
              <CardContent>
                <Typography variant="h5" color="textSecondary" component="p" >
                  Create A Post
                </Typography>
                <CardHeader
                  avatar={ <Avatar alt={userName} src={avatar} /> }
                  title={`What's On Your Mind, ${userName}?`}
                />
              </CardContent>
            </Card>
          </Box>

          <Box mb={2} ml={1}>
            <Card style={{backgroundColor: "yellow"}}>
              <CardMedia
                className={classes.media}
                image={postNotePaperY}
                style={{backgroundColor: "yellow", height: "60px", width: "70px"}}
                // title={board.name}
              />
              <CardContent>
                <Typography variant="h5" color="textSecondary" component="p">
                  post
                </Typography>
              </CardContent>
            </Card>
          </Box>





        </Grid>
      </Grid>
    </div>
  )
};


const mapStateToProps = (state: any) => ({
  userName: state.user.userData.name,
  avatar: state.user.userData.avatar,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);

// {/*<List className={classes.root}>*/}
// {/*  <ListItem alignItems="flex-start">*/}
// {/*    <ListItemAvatar>*/}
// {/*      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />*/}
// {/*    </ListItemAvatar>*/}
// {/*    <ListItemText*/}
// {/*      primary="Brunch this weekend?"*/}
// {/*      secondary={*/}
// {/*        <React.Fragment>*/}
// {/*          <Typography*/}
// {/*            component="span"*/}
// {/*            variant="body2"*/}
// {/*            className={classes.inline}*/}
// {/*            color="textPrimary"*/}
// {/*          >*/}
// {/*            Ali Connors*/}
// {/*          </Typography>*/}
// {/*          {" — I'll be in your neighborhood doing errands this…"}*/}
// {/*        </React.Fragment>*/}
// {/*      }*/}
// {/*    />*/}
// {/*  </ListItem>*/}
// {/*  <Divider variant="inset" component="li" />*/}
// {/*  <ListItem alignItems="flex-start">*/}
// {/*    <ListItemAvatar>*/}
// {/*      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />*/}
// {/*    </ListItemAvatar>*/}
// {/*    <ListItemText*/}
// {/*      primary="Summer BBQ"*/}
// {/*      secondary={*/}
// {/*        <React.Fragment>*/}
// {/*          <Typography*/}
// {/*            component="span"*/}
// {/*            variant="body2"*/}
// {/*            className={classes.inline}*/}
// {/*            color="textPrimary"*/}
// {/*          >*/}
// {/*            to Scott, Alex, Jennifer*/}
// {/*          </Typography>*/}
// {/*          {" — Wish I could come, but I'm out of town this…"}*/}
// {/*        </React.Fragment>*/}
// {/*      }*/}
// {/*    />*/}
// {/*  </ListItem>*/}
// {/*  <Divider variant="inset" component="li" />*/}
// {/*  <ListItem alignItems="flex-start">*/}
// {/*    <ListItemAvatar>*/}
// {/*      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />*/}
// {/*    </ListItemAvatar>*/}
// {/*    <ListItemText*/}
// {/*      primary="Oui Oui"*/}
// {/*      secondary={*/}
// {/*        <React.Fragment>*/}
// {/*          <Typography*/}
// {/*            component="span"*/}
// {/*            variant="body2"*/}
// {/*            className={classes.inline}*/}
// {/*            color="textPrimary"*/}
// {/*          >*/}
// {/*            Sandra Adams*/}
// {/*          </Typography>*/}
// {/*          {' — Do you have Paris recommendations? Have you ever…'}*/}
// {/*        </React.Fragment>*/}
// {/*      }*/}
// {/*    />*/}
// {/*  </ListItem>*/}
// {/*</List>*/}

// {/*<Box p={1}>*/}
//
// {/*  <Card>*/}
// {/*    <CardContent>*/}
// {/*      <Typography variant="h5" color="textSecondary" component="p">*/}
// {/*        post*/}
// {/*      </Typography>*/}
// {/*    </CardContent>*/}
// {/*  </Card>*/}
// {/*</Box>*/}
