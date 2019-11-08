import React, {useEffect, useState} from 'react';
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
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/core/SvgIcon/SvgIcon";
import {signInDialogCloseAction} from "../store/actions/action.userDataReducer";
import {getPostUserDataAction} from "../store/actions/action.userApiMiddleware";
import IUser from "../models/IUser";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';


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
  getPostUserData: Function;
  deleteBoardPost: Function;
  handlePostEdit: Function;
  handleCommentsDialogOpen: any;
  user_id: string;
  userLogin: boolean;
}

const PostCard: React.FC<IProps> = ({
                                      post,
                                      boardId,
                                      deleteBoardPost,
                                      handlePostEdit,
                                      getPostUserData,
                                      user_id,
                                      userLogin,
                                      handleCommentsDialogOpen
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userData, setUserData] = useState<IUser>({
    _id: '',
    googleId: '',
    name: '',
    email: '',
    createdAt: '',
    updatedAt: '',
    avatar: '',
  });
  const open = Boolean(anchorEl);
  const classes = useStyles();
  
  useEffect(() => {
    getPostUserData(post.userId, setUserData)
  }, []);

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
    handlePostEdit(post, "post");
    setAnchorEl(null);
  };

  const handleComment = () => {
    handlePostEdit(post, "comment");
    handleCommentsDialogOpen();
  };

  const handleLike = () => {

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
            avatar={<Avatar alt={userData.name} src={userData.avatar} />}
            title={userData.name}
            action={
              <IconButton aria-label="settings"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleMenu}
                          color="inherit"
                          disabled={!userLogin || user_id !== post.userId}
              >
                <MoreVertIcon style={{display: userLogin && user_id === post.userId ? '' : 'none'}}/>
              </IconButton>
            }
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
            <Typography variant="h4" color="textPrimary" component="h3">
              {post.title}
            </Typography>
            <Typography variant="h5" color="textSecondary" component="p">
              {post.body}
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
                <Paper style={{textAlign: 'center'}}>
                  <Button style={{width: '100%'}} onClick={handleComment}>
                    <CommentIcon/>
                    <Typography variant="h6" style={{marginLeft: "5px"}}>
                      comment
                    </Typography>
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper style={{textAlign: 'center'}}>
                  <Button style={{width: '100%'}} onClick={handleLike}>
                    <ThumbUpIcon/>
                    <Typography variant="h6" style={{marginLeft: "5px"}}>
                      like
                    </Typography>
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
  user_id: state.user.userData._id,
  userLogin: state.user.userLogin,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getPostUserData: (userId: any, setUserData: any) => dispatch(getPostUserDataAction(userId, setUserData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);