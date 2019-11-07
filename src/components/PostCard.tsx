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
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import postNotePaperY from '../postNotePaperY.jpg';
import { apiURL } from '../services/data.service';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 300,
      width: 'auto',
      margin: 'auto',
      marginTop: theme.spacing(2),
    },
  }),
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
    deleteBoardPost(postId, boardId);
    setAnchorEl(null);
  };

  return (
    <Grid item>
      <Box mb={2} ml={1}>
        <Card style={{ backgroundColor: 'yellow' }}>
          <CardMedia
            className={classes.media}
            image={postNotePaperY}
            style={{ backgroundColor: 'yellow', height: '60px', width: '70px' }}
          />
          <CardHeader
            action={
              <IconButton
                aria-label="settings"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MoreVertIcon />
              </IconButton>
            }
            title={post.title}
            subheader={new Date(post.createdAt).toLocaleString('default', {
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
            <MenuItem onClick={handleDelete.bind(null, post._id)}>
              Delete
            </MenuItem>
          </Menu>
          <CardContent>
            <Typography variant="h5" color="textSecondary" component="p">
              {post.body}
            </Typography>
          </CardContent>
          {post.images &&
            post.images.map((image: any) => (
              <CardMedia
                key={image._id}
                className={classes.media}
                image={`${apiURL}/boards/${boardId}/posts/${post._id}/images/${image._id}/image`}
                title={image.description}
              />
            ))}
        </Card>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state: any) => ({
  userName: state.user.userData.name,
  avatar: state.user.userData.avatar,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostCard);

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
