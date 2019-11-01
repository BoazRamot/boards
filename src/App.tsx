import { Box, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { Route, Switch } from 'react-router';
import './App.scss';
import Board from './components/Board';
import Map from './components/GoogleMaps/GoogleMap';
import Header from './components/Header';

const App = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#855E42',
      },
    },
  });

  const PageNotFound = () => 'Page not found';

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <Box pt={7}>
          <Switch>
            <Route path="/boards/:id" component={Board} />
            <Route path="/" component={Map} />
            <Route render={PageNotFound} />
          </Switch>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default App;
