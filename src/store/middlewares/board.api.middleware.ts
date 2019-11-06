// import {Dispatch, Middleware, MiddlewareAPI} from 'redux';
import {BOARD_API_GET_POSTS} from "../actions/action.boardApiMiddleware";


// const boardPosts: Middleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => action => {};
  // if (action.type === BOARD_API_GET_POSTS) {
  //   const token = action.token;
  //   // (async () => {
  //   //   try {
  //   //     const url = "http://localhost:5000/api/auth/login";
  //   //     let res = await fetch(url, {method: 'GET', headers: {'X-Auth-Token': token}});
  //   //     let userData = await res.json();
  //   //     dispatch(userDataSet(userData));
  //   //   } catch (e) {
  //   //     console.error('User Fetch Failed', e)
  //   //   }
  //   // })();
  // }
  // return next(action);
// };
//
// export const boardMiddleware = [boardPosts];