// action types

export const USER_API_GET_USER = 'USER_API_GET_USER';

// action creators

export const getAllUserData = (token: any) => {
  return { type: USER_API_GET_USER, token }
};
