import { Dispatch, Middleware, MiddlewareAPI } from 'redux';

const getUserData: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
// tslint:disable-next-line: no-empty
) => action => {};
// const getUserData: Middleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => action => {
//   if (action.type === USER_API_GET_USER) {
//     const token = action.token;
//     (async () => {
//       try {
//         const url = "http://localhost:4000/api/auth/login";
//         let res = await fetch(url, {method: 'GET', headers: {'X-Auth-Token': token}});
//         let userData = await res.json();
//         dispatch(userDataSet(userData));
//       } catch (e) {
//         console.error('User Fetch Failed', e)
//       }
//     })();
//   }
//   return next(action);
// };

// export const userMiddleware = [getUserData];
