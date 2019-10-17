import {USER_LOGIN, USER_LOGOUT} from "../actions/action.loginReducer";


const loginInitState: any = {
  isLogin: false
};

const loginReducer = (state = loginInitState, action: any) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLogin: true
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLogin: false
      };
    default:
      return state;
  }
};

export default loginReducer;