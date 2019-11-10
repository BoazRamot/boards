import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import IBoard from '../../models/IBoard';
import IPost from '../../models/IPost';
import DataService, {
  // serverUrl,
  DataCollections,
} from '../../services/data.service';
import {
  BOARD_API_CREATE_POST,
  BOARD_API_CREATE_POST_COMMENT,
  BOARD_API_DELETE_POST,
  BOARD_API_EDIT_POST,
  BOARD_API_GET_BOARDS_BY_ID,
  BOARD_API_GET_POSTS,
  BOARD_API_GET_POSTS_COMMENTS,
} from '../actions/action.boardApiMiddleware';
import {
  addBoardPostCommentsDataAction,
  addBoardPostDataAction,
  boardDataSetAction,
  boardPostCommentsDataSetAction,
  boardPostsDataSetAction,
  editBoardPostDataAction,
  removeBoardPostDataAction,
} from '../actions/action.boardsDataReducer';

const boardDataService = new DataService<IBoard>();
const postDataService = new DataService<IPost>();

const postsPath = (boardId: any) =>
  `${DataCollections.Boards}/${boardId}/${DataCollections.Posts}`;

const commentsPath = (boardId: any, postId: any) =>
  `${postsPath(boardId)}/${postId}/${DataCollections.Comments}`;

const getBoardPosts: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => async action => {
  if (action.type === BOARD_API_GET_POSTS) {
    // const boardId = action.boardId;
    // (async () => {
    //   try {
    //     const url = `http://localhost:5000/api/boards/${boardId}/posts`;
    //     let res = await fetch(url);
    //     let postsData = await res.json();
    //     dispatch(boardPostsDataSetAction(postsData));
    //   } catch (e) {
    //     console.error('Posts Fetch Failed', e);
    //   }
    // })();
    try {
      const postsData = await postDataService.get(postsPath(action.boardId));
      dispatch(boardPostsDataSetAction(postsData));
    } catch (error) {
      console.error('Posts Fetch Failed', error);
    }
  }
  return next(action);
};

const createBoardPost: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => async action => {
  if (action.type === BOARD_API_CREATE_POST) {
    const token = localStorage.getItem('boards-token') || '';
    const {post, boardId} = action;
    // (async () => {
    //   try {
    //     const url = `http://localhost:5000/api/boards/${boardId}/posts`;
    //     const res = await fetch(url, {
    //       method: 'POST',
    //       headers: {
    //         'X-Auth-Token': token,
    //       },
    //       body: post,
    //     });
    //     const postData = await res.json();
    //     console.log('new post Data: ', postData);
    //     dispatch(addBoardPostDataAction(postData));
    //   } catch (e) {
    //     console.error('Post Create Failed', e);
    //   }
    // })();
    try {
      const postData = await postDataService.insert(
        postsPath(boardId),
        post,
        { 'X-Auth-Token': token },
      );
      console.log('new post Data: ', postData);
      dispatch(addBoardPostDataAction(postData));
    } catch (error) {
      console.error('Board Create Failed', error);
    }
  }
  return next(action);
};

const getBoardById: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => async action => {
  if (action.type === BOARD_API_GET_BOARDS_BY_ID) {
    // const id = action.boardId;
    // (async () => {
    //   try {
    //     const url = `${serverUrl}/boards/${id}`;
    //     const res = await fetch(url);
    //     const boardsData = await res.json();
    //     console.log('boardsData', boardsData);
    //     dispatch(boardDataSetAction(boardsData));
    //   } catch (e) {
    //     console.error('Board By Id Fetch Failed', e);
    //   }
    // })();
    try {
      const boardsData = await boardDataService.getById(
        DataCollections.Boards,
        action.boardId,
      );
      console.log('boardsData', boardsData);
      dispatch(boardDataSetAction(boardsData));
    } catch (error) {
      console.error('Boards Fetch Failed', error);
    }
  }
  return next(action);
};

const deleteBoardPost: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => async action => {
  if (action.type === BOARD_API_DELETE_POST) {
    const token = localStorage.getItem('boards-token') || '';
    const {postId, boardId} = action;
    // (async () => {
    //   try {
    //     const url = `${serverUrl}/${DataCollections.Boards}/${boardId}/${DataCollections.Posts}/${postId}`;
    //     const res = await fetch(url, {
    //       method: 'DELETE',
    //       headers: {
    //         'X-Auth-Token': token,
    //       },
    //     });
    //     const postData = await res.json();
    //     console.log('new post Data: ', postData);
    //     dispatch(removeBoardPostDataAction(postId));
    //   } catch (e) {
    //     console.error('Post Delete Failed', e);
    //   }
    // })();
    try {
      const result = await postDataService.removeById(
        postsPath(boardId),
        postId,
        {
          'X-Auth-Token': token,
        },
      );
      console.log('new post Data: ', result);
      dispatch(removeBoardPostDataAction(postId));
    } catch (error) {
      console.error('Board Create Failed', error);
    }
  }
  return next(action);
};

const editBoardPost: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => async action => {
  if (action.type === BOARD_API_EDIT_POST) {
    const token = localStorage.getItem('boards-token') || '';
    const { post, boardId } = action;
    const postId = post.get('_id');
    // console.log('post', post);
    console.log('boardId', boardId);
    console.log('postId', postId);
    // (async () => {
    //   try {
    //     const url = `${serverUrl}/${boardId}/posts/${postId}`;
    //     const res = await fetch(url, {
    //       method: 'PUT',
    //       headers: {
    //         'X-Auth-Token': token,
    //       },
    //       body: post,
    //     });
    //     const postData = await res.json();
    //     console.log('new post Data: ', postData);
    //     await dispatch(editBoardPostDataAction(postData));
    //   } catch (e) {
    //     console.error('Board Create Failed', e);
    //   }
    // })();
    try {
      const postData = await postDataService.updateById(
        postsPath(boardId),
        postId,
        post,
        {
          'X-Auth-Token': token,
        },
      );
      console.log('new post Data: ', postData);
      dispatch(editBoardPostDataAction(postData));
    } catch (error) {
      console.error('Board Create Failed', error);
    }
  }
  return next(action);
};

const createBoardPostComment: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => async action => {
  if (action.type === BOARD_API_CREATE_POST_COMMENT) {
    console.log('createBoardPostComment');
    const token = localStorage.getItem('boards-token') || '';
    const { comment, postId, boardId } = action;
    // (async () => {
    //   try {
    //     const url = `${serverUrl}/boards/${boardId}/posts/${postId}/comments`;
    //     const res = await fetch(url, {
    //       method: 'POST',
    //       headers: {
    //         'X-Auth-Token': token,
    //       },
    //       body: comment,
    //     });
    //     const commentData = await res.json();
    //     console.log('new post Data: ', commentData);
    //     // await dispatch(editBoardPostDataAction(postData));
    //     // setComments({...commentData});
    //     await dispatch(addBoardPostCommentsDataAction());
    //   } catch (e) {
    //     console.error('Board Create Failed', e);
    //   }
    // })();
    try {
      const commentData = await postDataService.insert(
        commentsPath(boardId, postId),
        comment,
        { 'X-Auth-Token': token },
      );
      console.log('new comment Data: ', commentData);
      // await dispatch(editBoardPostDataAction(postData));
      // setComments({...commentData});
      dispatch(addBoardPostCommentsDataAction());
    } catch (error) {
      console.error('Comment Create Failed', error);
    }
  }
  return next(action);
};

const getBoardPostsComments: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => async action => {
  if (action.type === BOARD_API_GET_POSTS_COMMENTS) {
    console.log('getBoardPostsComments');
    const {boardId, postId, setComments} = action;
    // (async () => {
    //   try {
    //     const url = `${serverUrl}/boards/${boardId}/posts/${postId}/comments`;
    //     let res = await fetch(url);
    //     const commentsData = await res.json();
    //     console.log('commentsData', commentsData);
    //     setComments(commentsData);
    //     dispatch(boardPostCommentsDataSetAction());
    //   } catch (e) {
    //     console.error('Comments Fetch Failed', e);
    //   }
    // })();
    try {
      const commentsData = await postDataService.get(commentsPath(boardId, postId));
      console.log('commentsData', commentsData);
      setComments(commentsData);
      dispatch(boardPostCommentsDataSetAction());
    } catch (error) {
      console.error('Comments Fetch Failed', error);
    }
  }
  return next(action);
};

export const boardMiddleware = [
  getBoardPosts,
  createBoardPost,
  getBoardById,
  deleteBoardPost,
  editBoardPost,
  createBoardPostComment,
  getBoardPostsComments,
];
