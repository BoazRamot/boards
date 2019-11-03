import { Box, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Dispatch } from 'redux';
import './App.scss';
import Board from './components/Board';
import ErrorBoundary from './components/ErrorBoundary';
import Map from './components/GoogleMap';
import Header from './components/Header';
import PostForm from './components/PostForm';
import Redirect from './components/Redirect';
import User from './components/User';
import { loadStateFromLocalStorage } from './helpers/localStorage';
import {
  resetMarkerAction,
  resetStateAction,
} from './store/actions/action.googleMapReducer';
import { getAllBoardsAction } from './store/actions/action.mapApiMiddleware';
import {
  loadMapDataNowAction,
  saveMapDataNowAction,
} from './store/actions/action.mapDataMiddleware';
import {
  resetPopstateAction,
  setPopstateAction,
} from './store/actions/action.mapReducer';
import { getAllUserDataAction } from './store/actions/action.userApiMiddleware';

interface IProps {
  getAllUserData: Function;
  saveMapDataNow: Function;
  loadMapDataNow: Function;
  resetMarker: Function;
  resetState: Function;
  getAllBoards: Function;
  setPopstate: Function;
  resetPopstate: Function;
  marker: any;
  redirect: any;
  placeListener: any;
  popstate: any;
}

const App: React.FC<IProps> = ({
  popstate,
  // resetPopstate,
  // setPopstate,
  // getAllBoards,
  resetState,
  placeListener,
  // resetMarker,
  loadMapDataNow,
  // redirect,
  // marker,
  saveMapDataNow,
  getAllUserData,
}) => {
  useEffect(() => {
    if (popstate) {
      const persistedState = loadStateFromLocalStorage();
      window.google.maps.event.removeListener(placeListener);
      // marker.map((marker: any) => marker.setMap(null));
      resetState();
      loadMapDataNow(persistedState);
    }
    // eslint-disable-next-line
  }, [popstate]);

  useEffect(() => {
    console.log('app up');

    window.addEventListener('beforeunload', saveOnRefresh);
    window.addEventListener('popstate', saveOnRefresh.bind(null, 'popstate'));

    const token = localStorage.getItem('boards-token');
    if (token) {
      getAllUserData(token);
    }

    return () => {
      console.log('app down');
      window.removeEventListener('beforeunload', saveOnRefresh);
      window.removeEventListener('popstate', saveOnRefresh);
      window.google.maps.event.removeListener(placeListener);
      localStorage.removeItem('boardsMapStateLocal');
    };
    // eslint-disable-next-line
  }, []);

  const saveOnRefresh = (_popstate: any = null) => {
    saveMapDataNow(_popstate);
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#855E42',
      },
    },
  });

  const PageNotFound = () => 'Page not found';

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <Router>
            <Header />
            <Box pt={7}>
              <Switch>
                <Route path="/redirect/:id" component={Redirect} />
                <Route path="/boards/:id" component={Board} />
                <Route path="/boards/:id/posts/:postId" component={PostForm} />
                <Route path="/users/:id" component={User} />
                <Route path="/" component={Map} />
                <Route render={PageNotFound} />
              </Switch>
            </Box>
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  marker: state.googleMap.marker,
  placeListener: state.googleMap.placeListener,
  redirect: state.map.redirect,
  popstate: state.map.popstate,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveMapDataNow: (popstate: any) => dispatch(saveMapDataNowAction(popstate)),
  loadMapDataNow: (persistedState: any) =>
    dispatch(loadMapDataNowAction(persistedState)),
  resetMarker: () => dispatch(resetMarkerAction()),
  resetState: () => dispatch(resetStateAction()),
  getAllUserData: (token: any) => dispatch(getAllUserDataAction(token)),
  getAllBoards: () => dispatch(getAllBoardsAction()),
  setPopstate: () => dispatch(setPopstateAction()),
  resetPopstate: () => dispatch(resetPopstateAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
