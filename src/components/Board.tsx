import { Grid } from '@material-ui/core';
import React from 'react';
import BoardDetails from './BoardDetails';
import BoardFeed from './BoardFeed';

const Board: React.FC = () => {
  return (
    <Grid container={true} justify="center">
      <Grid item={true} xs={10}>
        <BoardDetails/>
        <BoardFeed/>
      </Grid>
    </Grid>
  );
};

export default Board;
