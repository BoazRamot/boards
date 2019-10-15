import React from "react";
import {ListItem, ListItemText} from "@material-ui/core";
import {isBoardCloseToUser} from "./isBoardCloseToUser";

export const boardsAtThisLocation = (mapBoards: any, latLng: any) => {
  const list = mapBoards.filter((board: any) => ((board.latLng.lat === latLng.lat)&&(board.latLng.lng === latLng.lng)));
  return (
    boardsList(list)
  );
};

export const boardsCloseToThisLocation = (mapBoards: any, latLng: any) => {
  const list = mapBoards.filter((board: any) => ((board.latLng.lat !== latLng.lat)&&(board.latLng.lng !== latLng.lng)));
  const newList = list.filter((board: any) => {
    if (isBoardCloseToUser(board, latLng)) {
      return board;
    }
  });
  return (
    boardsList(newList)
  );
};

const boardsList = (list: any) => {
  return (
    <div>
      {list && list.map((board: any, index: any) => (
        <ListItem button key={index} >
          <ListItemText>{board.name}</ListItemText>
        </ListItem>
      ))}
    </div>
  );
};