import { Box, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { Route, Switch } from 'react-router';
import './App.scss';
import Board from './components/Board';
import Map from './components/GoogleMaps/GoogleMap';
import Header from './components/Header';
import IBoard from './models/IBoard';
import IComment from './models/IComment';
import IPost from './models/IPost';
import BoundDataService from './services/BoundDataService';
import { DataCollections } from './services/data.service';
import IUser from './models/IUser';

export const boardsDataService = new BoundDataService<IBoard>(
  DataCollections.Boards,
);
export const postsDataService = new BoundDataService<IPost>(
  DataCollections.Posts,
);
export const commentsDataService = new BoundDataService<IComment>(
  DataCollections.Comments,
);

export const usersDataService = new BoundDataService<IUser>(
  DataCollections.Users,
);

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
            <Route path="/board/:id" component={Board} />
            <Route path="/" component={Map} />
            <Route render={PageNotFound} />
          </Switch>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default App;
