// action types

export const MAP_BOARDS_DATA_SET = 'MAP_BOARDS_DATA_SET';
export const RESET_MAP_BOARDS_DATA = 'RESET_MAP_BOARDS_DATA';
export const BOARD_POSTS_DATA_SET = 'BOARD_POSTS_DATA_SET';
export const ADD_MAP_BOARD_DATA = 'ADD_MAP_BOARD_DATA';
export const BOARD_DATA_SET = 'BOARD_DATA_SET';


// action creators

export const mapBoardsDataSet = (payload: any) => {
  return { type: MAP_BOARDS_DATA_SET, payload }
};

export const addMapBoardData = (payload: any) => {
  return { type: ADD_MAP_BOARD_DATA, payload }
};

export const resetMapBoardsData = () => {
  return { type: RESET_MAP_BOARDS_DATA }
};

export const boardPostsDataSet = (payload: any) => {
  return { type: BOARD_POSTS_DATA_SET, payload }
};

export const boardDataSet = (payload: any) => {
  return { type: BOARD_DATA_SET, payload }
};


