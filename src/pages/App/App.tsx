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
import {saveMapDataNow} from "../../store/actions/action.mapDataMiddleware";

interface IProps {
  getAllUserData: Function
  saveMapDataNow: Function
}

const App: React.FC<IProps> = ({ saveMapDataNow, getAllUserData }) => {

  useEffect(() => {
    console.log('app up')

    window.addEventListener('beforeunload', saveOnRefresh);

    const token = localStorage.getItem('boards-token');
    if (token) {
      getAllUserData(token);
    }

    return () => {
      console.log('app down')
      // localStorage.removeItem('boards-map-state');
      window.removeEventListener("beforeunload", saveOnRefresh)
    }
  }, []);

  const saveOnRefresh = () => {
    console.log('save')
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

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveMapDataNow: () => dispatch(saveMapDataNow()),
  getAllUserData: (token: any) => dispatch(getAllUserData(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
