import { throttle } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import {
  // saveStateToLocalStorage,
  saveStateToSessionStorage,
} from './helpers/localStorage';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';

export const store = configureStore();

store.subscribe(
  throttle(() => {
    saveStateToSessionStorage({
      map: store.getState().map,
      user: store.getState().user,
      mapBoards: store.getState().mapBoards,
    });
  }, 1000),
);

// store.subscribe(
//   throttle(() => {
//     saveStateToLocalStorage({
//       map: store.getState().map,
//       mapBoards: store.getState().mapBoards,
//     });
//   }, 1000),
// );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
