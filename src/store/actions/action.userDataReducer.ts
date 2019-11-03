// action types

export const USER_DATA_SET = 'USER_DATA_SET';
export const RESET_USER_DATA = 'RESET_USER_DATA';
export const LOGOUT_USER = 'LOGOUT_USER';

// action creators

export const userDataSet = (payload: any) => {
  return { type: USER_DATA_SET, payload };
};

export const resetUserData = () => {
  return { type: RESET_USER_DATA };
};

export const logoutUser = () => {
  return { type: LOGOUT_USER };
};
