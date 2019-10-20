export const loadState = () => {
  try {
    // const serializedState = localStorage.getItem('boardsMapState');
    const serializedState = sessionStorage.getItem('boardsMapState');
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
    // localStorage.setItem('boardsMapState', serializedState);
    sessionStorage.setItem('boardsMapState', serializedState);
  } catch (e) {
    console.error('boardsMapState saveState Failed', e)
  }
};

// export const saveMapState = () => {
//   store.subscribe(throttle(() => {
//     saveState({
//       map: store.getState().map,
//       user: store.getState().user,
//       mapBoards: store.getState().mapBoards,
//     });
//   }, 1000));
// };

// export const saveMapState = () => {
//   store.subscribe(() => {
//     saveState({
//       map: store.getState().map
//     });
//   });
// };