import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import IBoard from '../models/IBoard';
import BoundDataService from '../services/BoundDataService';
import { DataCollections } from '../services/data.service';
import BoardDetails from './BoardDetails';
import BoardFeed from './BoardFeed';
import Loading from './Loading';

const Board: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const [board, setBoard] = useState<IBoard>();
  const boardDataService = new BoundDataService<IBoard>('', DataCollections.Boards);
  // get data on mount
  useEffect(() => {
    const getBoard = async (id: string) => {
      boardDataService.getById(id).then(data => {
        if (data) {
          setBoard(data);
        }
      });
    };
    if (match.params.id) {
      getBoard(match.params.id);
    }
  }, [match.params.id]);

  if (!board) {
    return <Loading />;
  }

  return (
    <Grid container={true} justify="center">
      <Grid item={true} xs={10}>
        <BoardDetails board={board} />
        <BoardFeed board={board} />
      </Grid>
    </Grid>
  );
};

export default Board;
