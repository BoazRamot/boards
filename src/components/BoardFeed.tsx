import React, { useState } from 'react';
import Loading from './Loading';
import PostList from './PostList';
import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from '@material-ui/core';
import PostInput from './PostInput';
import PostFormDialog from './PostFormDialog';
import { Dispatch } from 'redux';
import {
  createNewPostAction,
  deleteBoardPostAction,
  getBoardPostsAction,
} from '../store/actions/action.boardApiMiddleware';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerRoot: {
      height: 'calc(100%)',
      display: "flex",
      flexDirection: "column",
      width: "80vw"
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

const BoardFeed: React.FC<IProps> = ({ createBoardPost, board, posts, deleteBoardPost }) => {
  const [openNewPost, setOpenNewPost] = useState(false);
  const classes = useStyles();

  const handleNewPostOpen = () => {
    setOpenNewPost(true);
  };

  const handleNewPostClose = () => {
    setOpenNewPost(false);
  };

  if (!posts) {
    return <Loading />;
  }

  return (
    <Grid item xs={12} sm>
      <div className={classes.drawerRoot}>
        <PostFormDialog boardId={board._id}
                        createBoardPost={createBoardPost}
                        openNewPost={openNewPost}
                        handleNewPostClose={handleNewPostClose}
        />
        <Grid container style={{flexGrow: 1, display: "flex", flexDirection: "column", minHeight: 0}}>
          <PostInput handleNewPostOpen={handleNewPostOpen}/>
          <PostList posts={posts} boardId={board._id} deleteBoardPost={deleteBoardPost}/>
        </Grid>
      </div>
    </Grid>
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
