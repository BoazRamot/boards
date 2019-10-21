import {applyMiddleware, combineReducers, createStore} from 'redux'
import mapReducer from "./reducers/mapReducer";
import userDataReducer from "./reducers/userDataReducer";
import {loadStateFromLocalStorage, loadStateFromSessionStorage} from "../helpers/localStorage";
import {mapBoardsMiddleware} from "./middlewares/map.api.middleware";
import boardsDataReducer from "./reducers/boardsDataReducer";
import {userMiddleware} from "./middlewares/user.api.middleware";
import googleMapReducer from "./reducers/googleMapReducer";
import {mapDataMiddleware} from "./middlewares/map.data.middleware";
import {store} from "../index";

export default function configureStore() {
  const middleware = [...mapBoardsMiddleware, ...userMiddleware, ...mapDataMiddleware];
  const middlewareEnhancer = applyMiddleware(...middleware);
  // const session = loadStateFromSessionStorage();
  // const local = loadStateFromLocalStorage();
  // const persistedState = {...session, ...local};
  const persistedState = loadStateFromSessionStorage();

  console.log('persistedState', persistedState)

  

  const rootReducer = combineReducers({
    map: mapReducer,
    user: userDataReducer,
    mapBoards: boardsDataReducer,
    googleMap: googleMapReducer,
  });

  return createStore(rootReducer, persistedState, middlewareEnhancer)
  // return createStore(rootReducer, {}, middlewareEnhancer)
}