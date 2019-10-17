import React, {useEffect} from "react";
import "./App.css";
import Map from "./components/GoogleMaps/GoogleMap";
import Header from "./components/Header";
import {Route, Switch} from "react-router";
import Board from "./components/Board";
import {Box, createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/styles';
import Redirect from "./components/Redirect";
import {Dispatch} from "redux";
import {userLogin, userLogout} from "./store/actions/action.loginReducer";
import {connect} from "react-redux";
import {getUser} from "./store/actions/action.userReducer";

interface IProps {
  isLogin: boolean
  getUser: Function
  userLogin: Function
}

const App: React.FC<IProps> = ({ isLogin, getUser, userLogin }) => {

  useEffect(() => {
    console.log('app up')

    const token = localStorage.getItem('boards-token');
    console.log('token', token)
    if (token) {
      (async function getUserAsync()
      {
        const url = "http://localhost:5000/api/auth/login";
        let res = await fetch(url, {method: 'GET', headers: { 'X-Auth-Token': token }});
        let userData = await res.json();
        // save to user reducer 
        getUser(userData.username, userData._Id, userData.avatar)
        // update login
        userLogin();
        console.log('userData', userData) ;
      })();
    }
    return () => {
      // localStorage.removeItem('boards-map-state');
    }
  }, [])

  useEffect(() => {
    
  }, [isLogin]);

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
            <Route path="/Redirect/:id" component={Redirect}/>
            <Route path="/board/:id" component={Board}/>
            <Route path="/" component={Map}/>
            {/*<Route path="/map" component={Map}/>*/}
            {/*<Route path="/:id" component={Home}/>*/}
            <Route render={() => 'Page not found'}/>
          </Switch>
        </Box>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  isLogin: state.login.isLogin,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userLogin: () => dispatch(userLogin()),
  // userLogout: () => dispatch(userLogout()),
  getUser: (userName: string, Id: string, avatar: string) => dispatch(getUser(userName, Id, avatar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
