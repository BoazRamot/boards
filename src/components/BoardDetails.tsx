import { Grid } from '@material-ui/core';
import React from 'react';
import IBoard from '../models/IBoard';

interface IProps {
  board: IBoard;
}

const BoardDetails: React.FC<IProps> = ({ board }) => {
  return (
    <section className="board-details">
      <span>Board Details</span>
    </section>
  );
};

export default BoardDetails;
