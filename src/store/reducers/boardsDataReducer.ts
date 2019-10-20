import {MAP_BOARDS_DATA_SET, RESET_MAP_BOARDS_DATA} from "../actions/action.boardsDataReducer";

const boardsDataReducer = (state: Array<any> = [], action: any) => {
  switch (action.type) {
    case MAP_BOARDS_DATA_SET:
      state = action.payload;
      break;
      
    case RESET_MAP_BOARDS_DATA:
      state = [];
      break;
  }
  return state;
};

export default boardsDataReducer;