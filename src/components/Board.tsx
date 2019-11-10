import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';
import boardBackground from '../boardBackground.jpg';
import {
  getBoardByIdAction,
  getBoardPostsAction,
} from '../store/actions/action.boardApiMiddleware';
import { saveMapDataNowAction } from '../store/actions/action.mapDataMiddleware';
import BoardDetails from './BoardDetails';
import BoardFeed from './BoardFeed';
import Loading from './Loading';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      height: '100%',
      backgroundImage: `url(${boardBackground})`,
      backgroundSize: 'cover',
    },
  }),
);

interface IProps {
  board: any;
  saveMapDataNow: Function;
  getBoardPosts: Function;
  getBoardById: Function;
}

const Board: React.FC<IProps & RouteComponentProps> = ({
  match,
  board,
  saveMapDataNow,
  getBoardPosts,
  getBoardById,
}) => {
  const classes = useStyles();
  const boardId = (match.params as any).id;

  useEffect(() => {
    (async () => {
      if (Object.entries(board).length === 0 && board.constructor === Object) {
        await getBoardById(boardId);
      }
      await getBoardPosts(boardId);
    })();
    // eslint-disable-next-line
  }, []);

  if (Object.entries(board).length === 0 && board.constructor === Object) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <Box mt={2}>
        <Grid container spacing={1}>
          <BoardDetails board={board} saveMapDataNow={saveMapDataNow} />
          <BoardFeed />
        </Grid>
      </Box>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  board: state.mapBoards.board,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveMapDataNow: () => dispatch(saveMapDataNowAction(true)),
  getBoardPosts: (boardId: any) => dispatch(getBoardPostsAction(boardId)),
  getBoardById: (boardId: any) => dispatch(getBoardByIdAction(boardId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);
