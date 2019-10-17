import {store} from "../index";
import {throttle} from 'lodash'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('boardsMapState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('boardsMapState', serializedState);
  } catch {
    console.log('write errors')
    // ignore write errors
  }
};

// export const saveMapState = () => {
//   store.subscribe(throttle(() => {
//     saveState({
//       map: store.getState().map,
//     });
//   }, 1000));
// };

export const saveMapState = () => {
  store.subscribe(() => {
    saveState({
      map: store.getState().map
    });
  });
};