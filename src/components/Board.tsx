import React, {useEffect} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {RouteComponentProps, useHistory} from 'react-router-dom';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import boardSnapShoot from "../boardSnapShoot.jpg";
import {saveMapDataNowAction} from "../store/actions/action.mapDataMiddleware";
import BoardDetails from './BoardDetails';
import BoardFeed from './BoardFeed';
import Loading from './Loading';
import { getBoardByIdAction, getBoardPostsAction } from '../store/actions/action.boardApiMiddleware';
import { boardDataSetAction } from '../store/actions/action.boardsDataReducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      height: '100vh',
      backgroundImage: `url(${boardSnapShoot})`,
    },
  }),
);

interface IProps {
  board: any
  saveMapDataNow: Function
  getBoardPosts: Function
  getBoardById: Function
}

const Board: React.FC<IProps & RouteComponentProps> = ({ match, board, saveMapDataNow, getBoardPosts, getBoardById }) => {
  let history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    const boardId = (match.params as any).id;
    (async () => {
      if (Object.entries(board).length === 0 && board.constructor === Object) {
        await getBoardById(boardId);
      }
      await getBoardPosts(boardId);
    })();
  }, []);

  const handleImageClick = () => {
    saveMapDataNow();
    history.push("/");
  };

  if (Object.entries(board).length === 0 && board.constructor === Object) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <Box mt={2}>
        <Grid container spacing={1} >
          <BoardDetails board={board} handleImageClick={handleImageClick} />
          <Grid item xs={12} sm>
            <BoardFeed/>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
};

const mapStateToProps = (state: any) => ({
  board: state.mapBoards.board,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveMapDataNow: () => dispatch(saveMapDataNowAction(true)),
  getBoardPosts: (boardId: any) => dispatch(getBoardPostsAction(boardId)),
  getBoardById: (boardId: any) => dispatch(getBoardByIdAction(boardId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);