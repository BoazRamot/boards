import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import IBoard from '../../models/IBoard';
import IPost from '../../models/IPost';
// import {
// MAP_API_CREATE_BOARD,
// MAP_API_GET_BOARDS_BY_POINT,
// } from '../actions/action.mapApiMiddleware';
// import { store } from '../../index';
import DataService, { DataCollections } from '../../services/data.service';
import {
  BOARD_API_CREATE_POST,
  BOARD_API_DELETE_POST,
  BOARD_API_GET_BOARDS_BY_ID,
  BOARD_API_GET_POSTS,
} from '../actions/action.boardApiMiddleware';
import {
  addBoardPostDataAction,
  // addMapBoardDataAction,
  boardDataSetAction,
  boardPostsDataSetAction,
  // mapBoardsDataSetAction,
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
    //     const url = `${apiURL}/boards/${boardId}/posts`;
    //     const res = await fetch(url);
    //     const postsData = await res.json();
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
  next(action);
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
    //     const url = `${apiURL}/boards/${boardId}/posts`;
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
    //     console.error('Board Create Failed', e);
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
    //     console.error('Boards Fetch Failed', e);
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
    //     const url = `${apiURL}/boards/${boardId}/posts/${postId}`;
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
    //     console.error('Board Create Failed', e);
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

export const boardMiddleware = [
  getBoardPosts,
  createBoardPost,
  getBoardById,
  deleteBoardPost,
];
