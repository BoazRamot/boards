import React, {ReactEventHandler} from "react";
import {Button, Divider,} from "@material-ui/core";


interface IProps {
  handleNewBoardOpen: ReactEventHandler
}

const AddBoard: React.FC<IProps> = ({ handleNewBoardOpen }) => {
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleNewBoardOpen}>
        Add Board To This Location
      </Button>
      <Divider />
    </div>
  )
};


export default AddBoard;
