import {
  LOGOUT_USER, SIGN_IN_DIALOG_CLOSE, SIGN_IN_DIALOG_OPEN, USER_ACCOUNT,
  // RESET_USER_DATA,
  USER_DATA_SET,
} from '../actions/action.userDataReducer';

const userDataInitState: any = {
  userData: {},
  userLogin: false,
  userSignInDialog: false,
  userAccount: null,
};

const userDataReducer = (state: any = userDataInitState, action: any) => {
  switch (action.type) {
    case USER_DATA_SET:
      return {
        ...state,
        userData: action.payload,
        userLogin: true,
      };

    // case RESET_USER_DATA:
    //   state = {};
    //   break;

    case LOGOUT_USER:
      return {
        ...state,
        userLogin: false,
      };

    case SIGN_IN_DIALOG_OPEN:
      return {
        ...state,
        userSignInDialog: true,
      };

    case SIGN_IN_DIALOG_CLOSE:
      return {
        ...state,
        userSignInDialog: false,
      };

    case USER_ACCOUNT:
      return {
        ...state,
        userAccount: action.payload,
      };

    default:
      return state;
  }
};

export default userDataReducer;
