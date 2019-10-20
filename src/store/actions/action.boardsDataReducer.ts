// action types

export const MAP_BOARDS_DATA_SET = 'MAP_BOARDS_DATA_SET';
export const RESET_MAP_BOARDS_DATA = 'RESET_MAP_BOARDS_DATA';


// action creators

export const mapBoardsDataSet = (payload: any) => {
  return { type: MAP_BOARDS_DATA_SET, payload }
};

export const resetMapBoardsData = () => {
  return { type: RESET_MAP_BOARDS_DATA }
};


