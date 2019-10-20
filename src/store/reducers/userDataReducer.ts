import {LOGOUT_USER, RESET_USER_DATA, USER_DATA_SET} from "../actions/action.userDataReducer";

const userDataInitState: any = {
  userData: {},
  userLogin: false
};

const userDataReducer = (state: any = userDataInitState, action: any) => {
  switch (action.type) {
    case USER_DATA_SET:
      return {
        ...state,
        userData: action.payload,
        userLogin: true
      };

    // case RESET_USER_DATA:
    //   state = {};
    //   break;

    case LOGOUT_USER:
      return {
        ...state,
        userLogin: false
      };
      
    default:
      return state;
  }
};

export default userDataReducer;