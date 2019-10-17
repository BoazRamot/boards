import {Dispatch, Middleware, MiddlewareAPI} from 'redux';

const getMapRedirect: Middleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => action => {
  
  return next(action);
};

export const mapMdl = getMapRedirect;
