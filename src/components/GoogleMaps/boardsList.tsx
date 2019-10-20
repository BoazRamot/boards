import React from "react";
import {ListItem, ListItemText} from "@material-ui/core";
import {isBoardCloseToUser} from "../../helpers/GoogleMaps/isBoardCloseToUser";

export const boardsAtThisLocation = (mapBoards: any, latLng: any) => {
  const list = mapBoards.filter((board: any) =>
    ((board.location.latitude === latLng.lat)&&(board.location.longitude === latLng.lng)));
  return (
    boardsList(list)
  );
};

export const boardsCloseToThisLocation = (mapBoards: any, latLng: any) => {
  const list = mapBoards.filter((board: any) =>
    ((board.location.latitude !== latLng.lat)&&(board.location.longitude !== latLng.lng)));
  const newList = list.filter((board: any) => {return (isBoardCloseToUser(board, latLng) ? board : null)});
  return (
    boardsList(newList)
  );
};

const boardsList = (list: any) => {
  return (
    <div>
      {list && list.map((board: any) => (
        <ListItem button key={board._id} >
          <ListItemText>{board.name}</ListItemText>
        </ListItem>
      ))}
    </div>
  );
};