import {
  ADD_MAP_BOARD_DATA,
  BOARD_POSTS_DATA_SET,
  MAP_BOARDS_DATA_SET,
  RESET_MAP_BOARDS_DATA
} from "../actions/action.boardsDataReducer";

const boardsDataInitState: any = {
  mapBoards: [],
  board: {},
  posts: []
};

// const boardsDataReducer = (state: Array<any> = [], action: any) => {
const boardsDataReducer = (state: any = boardsDataInitState, action: any) => {
  switch (action.type) {
    case MAP_BOARDS_DATA_SET:
      return {
        ...state,
        mapBoards: action.payload,
      };
      
    case RESET_MAP_BOARDS_DATA:
      return {
        ...state,
        mapBoards: []
      };

    case ADD_MAP_BOARD_DATA:
      return {
        ...state,
        mapBoards: [...state.mapBoards, action.payload],
        board: action.payload,
      };

    case BOARD_POSTS_DATA_SET:
      return {
        ...state,
        posts: action.payload,
      };

    default:
      return state;
  }
};

export default boardsDataReducer;