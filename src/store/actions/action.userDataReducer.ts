// action types

export const USER_DATA_SET = 'USER_DATA_SET';
export const RESET_USER_DATA = 'RESET_USER_DATA';
export const LOGOUT_USER = 'LOGOUT_USER';

// action creators

export const userDataSetAction = (payload: any) => {
  return { type: USER_DATA_SET, payload };
};

export const resetUserDataAction = () => {
  return { type: RESET_USER_DATA };
};

export const logoutUserAction = () => {
  return { type: LOGOUT_USER };
};
