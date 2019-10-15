import React, {useEffect} from "react";
import "./App.css";
import Map from "./components/GoogleMaps/GoogleMap";
import Header from "./components/Header";
import {Route, Switch} from "react-router";
import Board from "./components/Board";
import {Box, createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/styles';
import Home from "./components/Home";

interface IProps {

}

const App: React.FC<IProps> = ({}) => {

  useEffect(() => {
    console.log('app up')
    // localStorage.getItem('');
    // const id = (match.params as {id: string}).id;
    // console.log('id',id)
    return () => {
      console.log('app down')
    }
  }, [])

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
            <Route path="/Home/:id" component={Home}/>
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

export default App;
