import React from "react";
import "./App.css";
import Map from "./components/GoogleMaps/GoogleMap";
import Header from "./components/Header";
import {Route, Switch} from "react-router";
import Board from "./components/Board";
import {Box, createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/styles';

const App = () => {
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
            <Route path="/board/:id" component={Board}/>
            <Route path="/" component={Map}/>
            <Route render={() => 'Page not found'}/>
          </Switch>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default App;
