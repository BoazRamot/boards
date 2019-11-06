import React, { ReactEventHandler, useEffect, useRef, useState } from 'react';
import IBoard from '../models/IBoard';
import ILookup from '../models/ILookup';
import IPost from '../models/IPost';
import BoundDataService from '../services/BoundDataService';
import { DataCollections } from '../services/data.service';
import Loading from './Loading';
import PostForm from './PostForm';
import PostList from './PostList';
import {
  Card, CardContent, CardHeader,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Grid,
  makeStyles,
  MenuItem,
  TextField,
  Theme, Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import postNotePaperY from '../postNotePaperY.jpg';
import PostInput from './PostInput';
import PostFormDialog from './PostFormDialog';
import { Dispatch } from 'redux';
import { saveMapDataNowAction } from '../store/actions/action.mapDataMiddleware';
import {
  createNewPostAction,
  deleteBoardPostAction,
  getBoardPostsAction,
} from '../store/actions/action.boardApiMiddleware';
import { connect } from 'react-redux';
import { getBoardPosts } from '../../../../boaz-repository/boards/src/store/actions/action.boardApiMiddleware';

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
  // board: IBoard;
  board: any;
  posts: any;
  createBoardPost: Function;
  deleteBoardPost: Function;
  getBoardPosts: Function;
}

const BoardFeed: React.FC<IProps> = ({ createBoardPost, board, posts, deleteBoardPost, getBoardPosts }) => {
  const [openNewPost, setOpenNewPost] = useState(false);
  // const [postList, setPostList] = useState<ILookup<IPost>>({});
  const classes = useStyles();

  // const postDataService = new BoundDataService<IPost>(
  //   `${DataCollections.Boards}/${board._id}`,
  //   DataCollections.Posts,
  // );
  // useEffect(() => {
  //   getBoardPosts(board._id);
  //   // eslint-disable-next-line
  // }, [posts]);

  const handleNewPostOpen = () => {
    setOpenNewPost(true);
  };

  const handleNewPostClose = () => {
    setOpenNewPost(false);
  };

  // const onNewPost = (newPost: IPost) => {
  //   setPostList({ ...postList, [newPost._id]: newPost });
  // };

  // const onPostDelete = async (id: string) => {
  //   await postDataService.remove(id);
  //   delete postList[id];
  //   setPostList({ ...postList });
  // };

  if (!posts) {
    return <Loading />;
  }

  return (
    <div className={classes.drawerRoot}>
      {/*<PostFormDialog boardId={board._id} createBoardPost={createBoardPost} postDataService={postDataService} onSubmit={onNewPost} openNewPost={openNewPost} handleNewPostClose={handleNewPostClose}/>*/}
      <PostFormDialog boardId={board._id}
                      createBoardPost={createBoardPost}
                      openNewPost={openNewPost}
                      handleNewPostClose={handleNewPostClose}
      />
      <Grid container style={{flexGrow: 1, display: "flex", flexDirection: "column", minHeight: 0}}>
        <PostInput handleNewPostOpen={handleNewPostOpen}/>
        {/*<PostList postList={postList} onPostDelete={onPostDelete} />*/}
        <PostList posts={posts} boardId={board._id} deleteBoardPost={deleteBoardPost}/>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  board: state.mapBoards.board,
  posts: state.mapBoards.posts,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getBoardPosts: (boardId: any) => dispatch(getBoardPostsAction(boardId)),
  createBoardPost: (post: any, boardId: any) => dispatch(createNewPostAction(post, boardId)),
  deleteBoardPost: (postId: any, boardId: any) => dispatch(deleteBoardPostAction(postId, boardId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardFeed);
