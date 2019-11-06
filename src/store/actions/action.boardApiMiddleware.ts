// action types

export const BOARD_API_GET_POSTS = 'BOARD_API_GET_POSTS';



// action creators

export const getBoardPosts = (payload: any) => {
  return { type: BOARD_API_GET_POSTS, payload }
};