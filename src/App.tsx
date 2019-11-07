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
import Redirect from './components/Redirect';
import { saveMapDataNowAction } from './store/actions/action.mapDataMiddleware';
import { getAllUserDataAction } from './store/actions/action.userApiMiddleware';

interface IProps {
  getAllUserData: Function;
  saveMapDataNow: Function;
  placeListener: any;
}

const App: React.FC<IProps> = ({ placeListener, saveMapDataNow, getAllUserData }) => {

  useEffect(() => {
    console.log('app up');
    window.addEventListener('beforeunload', saveOnRefresh);
    window.addEventListener('popstate', saveOnRefresh);
    const token = localStorage.getItem('boards-token');
    if (token) {
      getAllUserData(token);
    }

    return () => {
      console.log('app down');
      window.removeEventListener('beforeunload', saveOnRefresh);
      window.removeEventListener('popstate', saveOnRefresh);
      window.google.maps.event.removeListener(placeListener);
      // localStorage.removeItem('boardsMapStateLocal');
    };
    // eslint-disable-next-line
  }, []);

  const saveOnRefresh = () => {
    console.log('saveOnRefresh');
    saveMapDataNow();
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
                {/*<Route path="/boards/:id/posts/:postId" component={PostForm} />*/}
                {/*<Route path="/users/:id" component={User} />*/}
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
  placeListener: state.googleMap.placeListener,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveMapDataNow: () => dispatch(saveMapDataNowAction()),
  getAllUserData: (token: any) => dispatch(getAllUserDataAction(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
