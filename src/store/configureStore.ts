import {applyMiddleware, combineReducers, createStore} from 'redux'
import mapReducer from "./reducers/mapReducer";

export default function configureStore() {
  // const middlewareEnhancer = applyMiddleware(quizzesMdl);
  // const persistedState = loadState();

  const rootReducer = combineReducers({
    map: mapReducer,
    // score: scoreReducer,
    // quizzes: quizzesDataReducer,
  });

  // return createStore(rootReducer, persistedState, middlewareEnhancer)
  return createStore(rootReducer)
}