// action types

export const MAP_API_GET_BOARDS = 'MAP_API_GET_BOARDS';
export const MAP_API_CREATE_BOARD = 'MAP_API_CREATE_BOARD';

// action creators

export const getAllBoards = () => {
  return { type: MAP_API_GET_BOARDS }
};

export const createNewBoard = (board: any) => {
  return { type: MAP_API_CREATE_BOARD, board }
};


