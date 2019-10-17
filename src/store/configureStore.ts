import {applyMiddleware, combineReducers, createStore} from 'redux'
import mapReducer from "./reducers/mapReducer";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";
import {loadState} from "../components/localStorage";

export default function configureStore() {
  // const middlewareEnhancer = applyMiddleware(quizzesMdl);
  // const persistedState = loadState();

  const rootReducer = combineReducers({
    map: mapReducer,
    login: loginReducer,
    user: userReducer,
    // quizzes: quizzesDataReducer,
  });

  // return createStore(rootReducer, persistedState, middlewareEnhancer)
  // return createStore(rootReducer, persistedState)
  return createStore(rootReducer)
}