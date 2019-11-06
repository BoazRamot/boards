import {applyMiddleware, combineReducers, createStore} from 'redux'
import mapReducer from "./reducers/mapReducer";
import userDataReducer from "./reducers/userDataReducer";
import {loadStateFromSessionStorage} from "../helpers/localStorage";
import {mapBoardsMiddleware} from "./middlewares/map.api.middleware";
import boardsDataReducer from "./reducers/boardsDataReducer";
import {userMiddleware} from "./middlewares/user.api.middleware";
import googleMapReducer from "./reducers/googleMapReducer";
import {mapDataMiddleware} from "./middlewares/map.data.middleware";
// import {boardMiddleware} from "./middlewares/board.api.middleware";

export default function configureStore() {
  // const middleware = [...mapBoardsMiddleware, ...userMiddleware, ...mapDataMiddleware, ...boardMiddleware];
  const middleware = [...mapBoardsMiddleware, ...userMiddleware, ...mapDataMiddleware];
  const middlewareEnhancer = applyMiddleware(...middleware);
  const persistedState = loadStateFromSessionStorage();
  const rootReducer = combineReducers({
    map: mapReducer,
    user: userDataReducer,
    mapBoards: boardsDataReducer,
    googleMap: googleMapReducer,
  });

  return createStore(rootReducer, persistedState, middlewareEnhancer)
}