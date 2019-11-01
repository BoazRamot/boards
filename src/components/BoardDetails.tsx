import { Grid } from '@material-ui/core';
import React from 'react';
import IBoard from '../models/IBoard';

interface IProps {
  board: IBoard;
}

const BoardDetails: React.FC<IProps> = ({ board }) => {
  return (
    <Grid container={true} justify="center">
      <Grid item={true} xs={10} />
    </Grid>
  );
};

export default BoardDetails;
