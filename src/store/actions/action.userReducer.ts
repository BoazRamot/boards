// action types

export const GET_USER = 'GET_USER';

// action creators

export const getUser = (userName: string, Id: string, avatar: string) => {
  return { type: GET_USER, userName, Id, avatar }
};



