import {GET_USER} from "../actions/action.userReducer";

const userInitState: any = {
  userName: '',
  Id: '',
  avatar: ''
};

const userReducer = (state = userInitState, action: any) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        userName: action.userName,
        Id: action.Id,
        avatar: action.avatar,
      };

    default:
      return state;
  }
};

export default userReducer;