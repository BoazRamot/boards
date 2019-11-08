import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import IBoard from '../../models/IBoard';
import IPost from '../../models/IPost';
import DataService, {
  // apiURL,
  DataCollections,
} from '../../services/data.service';
import {
  BOARD_API_CREATE_POST,
  BOARD_API_DELETE_POST,
  BOARD_API_EDIT_POST,
  BOARD_API_GET_BOARDS_BY_ID,
  BOARD_API_GET_POSTS,
} from '../actions/action.boardApiMiddleware';
import {
  addBoardPostDataAction,
  boardDataSetAction,
  boardPostsDataSetAction,
  editBoardPostDataAction,
  removeBoardPostDataAction,
} from '../actions/action.boardsDataReducer';

const boardDataService = new DataService<IBoard>();
const postDataService = new DataService<IPost>();

const postsPath = (boardId: any) =>
  `${DataCollections.Boards}/${boardId}/${DataCollections.Posts}`;

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
    // const post = action.post;
    // const boardId = action.boardId;
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
        postsPath(action.boardId),
        action.post,
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
    //     const url = `${apiURL}/boards/${id}`;
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
    // const postId = action.postId;
    // const boardId = action.boardId;
    // (async () => {
    //   try {
    //     const url = `${apiURL}/${DataCollections.Boards}/${boardId}/${DataCollections.Posts}/${postId}`;
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
        postsPath(action.boardId),
        action.postId,
        {
          'X-Auth-Token': token,
        },
      );
      console.log('new post Data: ', result);
      dispatch(removeBoardPostDataAction(action.postId));
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
    //     const url = `${apiURL}/${boardId}/posts/${postId}`;
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

export const boardMiddleware = [
  getBoardPosts,
  createBoardPost,
  getBoardById,
  deleteBoardPost,
  editBoardPost,
];
