import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { store } from '../../index';
import {
  addMapBoardDataAction,
  mapBoardsDataSetAction,
} from '../actions/action.boardsDataReducer';
import {
  MAP_API_CREATE_BOARD,
  MAP_API_GET_BOARDS,
} from '../actions/action.mapApiMiddleware';

const getMapBoards: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => action => {
  console.log('next state', store.getState());
  if (action.type === MAP_API_GET_BOARDS) {
    (async () => {
      try {
        const url = 'http://localhost:5000/api/boards';
        const res = await fetch(url);
        const boardsData = await res.json();
        dispatch(mapBoardsDataSetAction(boardsData));
      } catch (e) {
        console.error('Boards Fetch Failed', e);
      }
    })();
  }
  return next(action);
};

const createMapBoard: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => action => {
  if (action.type === MAP_API_CREATE_BOARD) {
    const token = localStorage.getItem('boards-token') || '';
    const board = JSON.stringify(action.board);
    (async () => {
      try {
        const url = 'http://localhost:5000/api/boards';
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'X-Auth-Token': token,
            'Content-Type': 'application/json',
          },
          body: board,
        });
        const boardData = await res.json();
        console.log('new board Data: ', boardData);
        dispatch(addMapBoardDataAction(boardData));
        // dispatch(mapBoardsDataSET(boardsData));
      } catch (e) {
        console.error('Board Create Failed', e);
      }
    })();
  }
  return next(action);
};

export const mapBoardsMiddleware = [getMapBoards, createMapBoard];
