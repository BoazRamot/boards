import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import IUser from '../../models/IUser';
import DataService, {
  // serverUrl,
  DataCollections,
} from '../../services/data.service';
import {
  USER_API_GET_POST_USER,
  USER_API_GET_USER,
} from '../actions/action.userApiMiddleware';
import { userDataSetAction } from '../actions/action.userDataReducer';

const userDataService = new DataService<IUser>();

const getUserData: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => async action => {
  if (action.type === USER_API_GET_USER) {
    const token = action.token;
    // (async () => {
    //   try {
    //     const url = `${serverUrl}/auth/login`;
    //     const res = await fetch(url, {
    //       method: 'GET',
    //       headers: { 'X-Auth-Token': token },
    //     });
    //     const userData = await res.json();
    //     dispatch(userDataSetAction(userData));
    //   } catch (e) {
    //     console.error('User Fetch Failed', e);
    //   }
    // })();
    try {
      const userData = await userDataService.get('auth/login', undefined, {
        'X-Auth-Token': token,
      });
      dispatch(userDataSetAction(userData));
    } catch (error) {
      console.error('User Fetch Failed', error);
    }
  }
  return next(action);
};

const getPostUserData: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => async action => {
  if (action.type === USER_API_GET_POST_USER) {
    const { userId, setUserData } = action;
    // (async () => {
    //   try {
    //     const url = `${serverUrl}/${DataCollections.Users}/${userId}`;
    //     const res = await fetch(url);
    //     const userData = await res.json();
    //     setUserData({ ...userData });
    //   } catch (e) {
    //     console.error('User Fetch Failed', e);
    //   }
    // })();
    try {
      const userData = await userDataService.getById(
        DataCollections.Users,
        userId,
      );
      setUserData({ ...userData });
    } catch (error) {
      console.error('User Fetch Failed', error);
    }
  }
  return next(action);
};

export const userMiddleware = [getUserData, getPostUserData];
