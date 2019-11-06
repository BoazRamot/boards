// action types

export const BOARD_API_GET_POSTS = 'BOARD_API_GET_POSTS';
export const BOARD_API_CREATE_POST = 'BOARD_API_CREATE_POST';
export const BOARD_API_GET_BOARDS_BY_ID = 'BOARD_API_GET_BOARDS_BY_ID';
export const BOARD_API_DELETE_POST = 'BOARD_API_DELETE_POST';

// action creators

export const getBoardPostsAction = (boardId: any) => {
  return { type: BOARD_API_GET_POSTS, boardId }
};

export const createNewPostAction = (post: any, boardId: any) => {
  return { type: BOARD_API_CREATE_POST, post, boardId };
};

export const getBoardByIdAction = (boardId: any) => {
  return { type: BOARD_API_GET_BOARDS_BY_ID, boardId }
};

export const deleteBoardPostAction = (postId: any, boardId: any) => {
  return { type: BOARD_API_DELETE_POST, postId, boardId };
};