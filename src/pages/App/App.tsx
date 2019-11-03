import React, {useEffect} from "react";
import "./App.css";
import {Route, Switch} from "react-router";
import {Box, createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/styles';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import Header from "../../components/Header";
import Redirect from "../Redirect/Redirect";
import Board from "../Board/Board";
import Map from "../GoogleMap/GoogleMap";
import {getAllUserData} from "../../store/actions/action.userApiMiddleware";
import {loadMapDataNow, saveMapDataNow} from "../../store/actions/action.mapDataMiddleware";
import {resetMarker, resetState} from "../../store/actions/action.googleMapReducer";
import {getAllBoards} from "../../store/actions/action.mapApiMiddleware";
import {loadStateFromLocalStorage} from "../../helpers/localStorage";
import {resetPopstate, setPopstate} from "../../store/actions/action.mapReducer";

interface IProps {
  getAllUserData: Function;
  saveMapDataNow: Function;
  loadMapDataNow: Function;
  resetMarker: Function;
  resetState: Function;
  getAllBoards: Function;
  setPopstate: Function;
  redirect: any
  placeListener: any
}

const App: React.FC<IProps> = ({ resetState, placeListener, loadMapDataNow, saveMapDataNow,
                                 getAllUserData }) => {
  
  useEffect(() => {
    console.log('app up')
    window.addEventListener('beforeunload', saveOnRefresh);
    window.addEventListener('popstate', saveOnRefresh);
    const token = localStorage.getItem('boards-token');
    if (token) getAllUserData(token);

    return () => {
      console.log('app down')
      window.removeEventListener("beforeunload", saveOnRefresh);
      window.removeEventListener("popstate", saveOnRefresh);
      window.google.maps.event.removeListener(placeListener);
      // localStorage.removeItem('boardsMapStateLocal');
    }
  }, []);

  const saveOnRefresh = () => {
    console.log('saveOnRefresh')
    saveMapDataNow();
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#855E42'
      }
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header/>
        <Box pt={7}>
          <Switch>
            <Route path="/redirect/:id" component={Redirect}/>
            <Route path="/board/:id" component={Board}/>
            <Route path="/" component={Map}/>
            <Route render={() => 'Page not found'}/>
          </Switch>
        </Box>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  placeListener: state.googleMap.placeListener,
  redirect: state.map.redirect,
  popstate: state.map.popstate,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveMapDataNow: () => dispatch(saveMapDataNow()),
  loadMapDataNow: (persistedState: any) => dispatch(loadMapDataNow(persistedState)),
  resetMarker: () => dispatch(resetMarker()),
  resetState: () => dispatch(resetState()),
  getAllUserData: (token: any) => dispatch(getAllUserData(token)),
  getAllBoards: () => dispatch(getAllBoards()),
  setPopstate: () => dispatch(setPopstate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
