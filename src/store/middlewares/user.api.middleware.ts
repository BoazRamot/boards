import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { USER_API_GET_USER } from '../actions/action.userApiMiddleware';
import { userDataSetAction } from '../actions/action.userDataReducer';

const getUserData: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => action => {
  if (action.type === USER_API_GET_USER) {
    const token = action.token;
    (async () => {
      try {
        const url = 'http://localhost:5000/api/auth/login';
        const res = await fetch(url, {
          method: 'GET',
          headers: { 'X-Auth-Token': token },
        });
        const userData = await res.json();
        dispatch(userDataSetAction(userData));
      } catch (e) {
        console.error('User Fetch Failed', e);
      }
    })();
  }
  return next(action);
};

export const userMiddleware = [getUserData];
