import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  Menu,
  MenuItem,
  Theme,
  Typography,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Avatar from '@material-ui/core/Avatar';
import postNotePaperY from "../postNotePaperY.jpg";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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

interface IProps {
  post: any;
  boardId: any;
  deleteBoardPost: Function;
}

const PostCard: React.FC<IProps> = ({ post, boardId, deleteBoardPost }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (postId: any) => {
    // console.log('e', postId.target.parentNode.parentNode.parentNode)
    deleteBoardPost(postId, boardId);
    setAnchorEl(null);
  };

  return (
    <Grid item >
      <Box mb={2} ml={1}>
        <Card style={{backgroundColor: "yellow"}}>
          <CardMedia
            className={classes.media}
            image={postNotePaperY}
            style={{backgroundColor: "yellow", height: "60px", width: "70px"}}
            // title={board.name}
          />
          <CardHeader
            action={
              <IconButton aria-label="settings"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleMenu}
                          color="inherit"
              >
                <MoreVertIcon/>
              </IconButton>
            }
            title={post.title}
            subheader={
              new Date(post.createdAt)
                .toLocaleString('default', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: false,
                })}
          />
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
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleDelete.bind(null, post._id)}>Delete</MenuItem>
          </Menu>
          <CardContent>
            <Typography variant="h5" color="textSecondary" component="p">
              {post.content}
            </Typography>
          </CardContent>
          {post.images &&
          post.images.map((image: any) => (
            <CardMedia
              key={image._id}
              className={classes.media}
              image={`http://localhost:5000/api/boards/${boardId}/posts/${post._id}/images/${image._id}/image`}
              title={image.description}
            />
          ))
          }
        </Card>
      </Box>
    </Grid>
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



// import React, { useState } from 'react';
// import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
// import IPost from '../models/IPost';
// import { apiURL } from '../services/data.service';
// import MenuMoreVertical from './MenuMoreVertical';
//
// interface IProps {
//   post: IPost;
//   onDelete: (id: string) => void;
// }
//
// const PostCard: React.FC<IProps & RouteComponentProps> = ({
//   post,
//   onDelete,
//   match,
// }) => {
//   const [isEditSelected, setIsEditSelected] = useState(false);
//
//   const onMenuClick = (key: string) => {
//     switch (key.toLowerCase()) {
//       case 'edit':
//         setIsEditSelected(true);
//         break;
//       case 'delete':
//         onDelete(post._id);
//         break;
//       default:
//         break;
//     }
//   };
//
//   if (isEditSelected) {
//     return (
//       <Redirect
//         push={true}
//         to={{
//           pathname: `${apiURL}${match.url}/posts/${post._id}`,
//           state: { post },
//         }}
//       />
//     );
//   }
//
//   return (
//     <section className="post-card">
//       <section className="post-card-header">
//         <div className="post-card-date">
//           {new Date(post.createdAt).toLocaleString('default', {
//             weekday: 'short',
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//             hour: 'numeric',
//             minute: 'numeric',
//             hour12: false,
//           })}
//         </div>
//         <MenuMoreVertical onItemClick={onMenuClick} />
//       </section>
//       <header>{post.title}</header>
//       {post.content && <p>{post.content}</p>}
//       {post.images &&
//         post.images.map(image => (
//           <img
//             key={image._id}
//             src={`${apiURL}${match.url}/posts/${post._id}/images/${image._id}/image`}
//             alt={image.description}
//           />
//         ))}
//     </section>
//   );
// };
//
// export default withRouter(PostCard);
