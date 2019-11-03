import {
  // createStyles,
  ListItem,
  ListItemText,
  // makeStyles,
  // Theme,
} from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { isBoardCloseToUser } from '../../helpers/GoogleMaps/isBoardCloseToUser';

export const boardsAtThisLocation = (mapBoards: any, latLng: any) => {
  const list = mapBoards.filter(
    (board: any) =>
      board.location.latitude === latLng.lat &&
      board.location.longitude === latLng.lng,
  );
  return boardsList(list);
};

export const boardsCloseToThisLocation = (mapBoards: any, latLng: any) => {
  const list = mapBoards.filter(
    (board: any) =>
      board.location.latitude !== latLng.lat &&
      board.location.longitude !== latLng.lng,
  );
  const newList = list.filter((board: any) => {
    return isBoardCloseToUser(board, latLng) ? board : null;
  });
  return boardsList(newList);
};

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: '100%',
//       maxWidth: 360,
//       backgroundColor: theme.palette.background.paper,
//     },
//   }),
// );

// const classes = useStyles();

const boardsList = (list: any) => {
  return (
    <div>
      {list &&
        list.map((board: any) => (
          <ListItem button key={board._id}>
            <RouterLink
              to={`/board/${board._id}`}
              style={{ textDecoration: 'none' }}
            >
              <ListItemText>{board.name}</ListItemText>
            </RouterLink>
          </ListItem>
        ))}
    </div>
  );
};
