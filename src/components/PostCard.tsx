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
import postNotePaperY from "../postNotePaperY.jpg";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardActions from "@material-ui/core/CardActions";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 300,
      width: 'auto',
      margin: 'auto',
      marginTop: theme.spacing(2)
    },
  })
);

interface IProps {
  post: any;
  boardId: any;
  deleteBoardPost: Function;
  handlePostEdit: Function;
}

const PostCard: React.FC<IProps> = ({ post, boardId, deleteBoardPost, handlePostEdit }) => {
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
    deleteBoardPost(postId, boardId);
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handlePostEdit(post);
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
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete.bind(null, post._id)}>Delete</MenuItem>
          </Menu>
          <CardContent>
            <Typography variant="h5" color="textSecondary" component="p">
              {post.content}
            </Typography>
          </CardContent>
          {post.images && post.images.map((image: any) => (
            <CardMedia
              key={image._id}
              className={classes.media}
              image={`http://localhost:5000/api/boards/${boardId}/posts/${post._id}/images/${image._id}/image`}
              title={image.description}
            />
          ))}
          <CardContent>
            <List style={{display: "flex", flexFlow: "row"}}>
              <ListItem>
                comments {post.comments.length}
              </ListItem>
              <ListItem style={{display: "flex", justifyContent: "flex-end"}}>
                likes {post.likes.length}
              </ListItem>
            </List>
          </CardContent>
          <Divider />
          <CardActions>
            <Grid container style={{flexGrow: 1, flexFlow: "row"}} spacing={2} >
              <Grid item xs={6}>
                <Paper style={{textAlign: 'center', background: "none"}}>
                  <Button>
                    <img src="https://img.icons8.com/ios/50/000000/speech-bubble-with-dots.png"/>
                    comment
                  </Button>

                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper style={{textAlign: 'center'}}>
                  <Button>
                    <img src="https://img.icons8.com/emoji/48/000000/thumbs-up.png"/>
                    like
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </CardActions>
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

