import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { store } from '../../index';
import IBoard from '../../models/IBoard';
import DataService, { DataCollections } from '../../services/data.service';
import {
  addMapBoardDataAction,
  mapBoardsDataSetAction,
} from '../actions/action.boardsDataReducer';
import {
  MAP_API_CREATE_BOARD,
  MAP_API_GET_BOARDS,
  MAP_API_GET_BOARDS_BY_POINT,
} from '../actions/action.mapApiMiddleware';

const boardDataService = new DataService<IBoard>();

const getMapBoards: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => async action => {
  // console.log('next state', store.getState());
  if (action.type === MAP_API_GET_BOARDS) {
    // (async () => {
    //   try {
    //     const url = `${apiURL}/boards`;
    //     const res = await fetch(url);
    //     const boardsData = await res.json();
    //     dispatch(mapBoardsDataSetAction(boardsData));
    //   } catch (e) {
    //     console.error('Boards Fetch Failed', e);
    //   }
    // })();
    try {
      const boardsData = await boardDataService.get(DataCollections.Boards);
      dispatch(mapBoardsDataSetAction(boardsData));
    } catch (error) {
      console.error('Boards Fetch Failed', error);
    }
  }
  return next(action);
};

const getMapBoardsByPoint: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => async action => {
  console.log('next state', store.getState());
  if (action.type === MAP_API_GET_BOARDS_BY_POINT) {
    const latLng = JSON.stringify(action.latLng);
    // (async () => {
    //   try {
    //     console.log('getMapBoardsByPoint latLng', latLng);
    //     const url = `${apiURL}/boards/${latLng}`;
    //     // const url = `${apiURL}/boards/latLng`;
    //     const res = await fetch(url);
    //     // let res = await fetch(url, {method: 'GET', headers: {'X-Auth-Token': latLng}});
    //     const boardsData = await res.json();
    //     console.log('boardsData', boardsData);
    //     dispatch(mapBoardsDataSetAction(boardsData));
    //   } catch (e) {
    //     console.error('Boards Fetch Failed', e);
    //   }
    // })();
    try {
      console.log('getMapBoardsByPoint latLng', latLng);
      const boardsData = await boardDataService.get(
        `${DataCollections.Boards}/${latLng}`,
      );
      console.log('boardsData', boardsData);
      dispatch(mapBoardsDataSetAction(boardsData));
    } catch (error) {
      console.error('Boards Fetch Failed', error);
    }
  }
  return next(action);
};

const createMapBoard: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => async action => {
  if (action.type === MAP_API_CREATE_BOARD) {
    const token = localStorage.getItem('boards-token') || '';
    // const board = JSON.stringify(action.board);
    // (async () => {
    //   try {
    //     const url = `${apiURL}/boards`;
    //     const res = await fetch(url, {
    //       method: 'POST',
    //       headers: {
    //         'X-Auth-Token': token,
    //         'Content-Type': 'application/json',
    //       },
    //       body: board,
    //     });
    //     const boardData = await res.json();
    //     console.log('new board Data: ', boardData);
    //     dispatch(addMapBoardDataAction(boardData));
    //     // dispatch(mapBoardsDataSET(boardsData));
    //   } catch (e) {
    //     console.error('Board Create Failed', e);
    //   }
    // })();
    try {
      const boardData = await boardDataService.insert(
        DataCollections.Boards,
        action.board,
        { 'X-Auth-Token': token },
      );
      console.log('new board Data: ', boardData);
      dispatch(addMapBoardDataAction(boardData));
    } catch (error) {
      console.error('Board Create Failed', error);
    }
  }
  return next(action);
};

export const mapBoardsMiddleware = [
  getMapBoardsByPoint,
  getMapBoards,
  createMapBoard,
];
