// action types

export const MAP_BOARDS_DATA_SET = 'MAP_BOARDS_DATA_SET';
export const RESET_MAP_BOARDS_DATA = 'RESET_MAP_BOARDS_DATA';
export const BOARD_POSTS_DATA_SET = 'BOARD_POSTS_DATA_SET';
export const ADD_MAP_BOARD_DATA = 'ADD_MAP_BOARD_DATA';

// action creators

export const mapBoardsDataSetAction = (payload: any) => {
  return { type: MAP_BOARDS_DATA_SET, payload };
};

export const addMapBoardDataAction = (payload: any) => {
  return { type: ADD_MAP_BOARD_DATA, payload };
};

export const resetMapBoardsDataAction = () => {
  return { type: RESET_MAP_BOARDS_DATA };
};

export const boardPostsDataSetAction = (payload: any) => {
  return { type: BOARD_POSTS_DATA_SET, payload };
};
