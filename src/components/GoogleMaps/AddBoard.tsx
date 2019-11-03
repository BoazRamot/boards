import React, {ReactEventHandler} from "react";
import {Button, Divider,} from "@material-ui/core";


interface IProps {
  handleNewBoardOpen: ReactEventHandler
}

const AddBoard: React.FC<IProps> = ({ handleNewBoardOpen }) => {
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleNewBoardOpen} style={{backgroundColor: "white"}}>
        Add Board Community To This Location
      </Button>
      <Divider />
    </div>
  )
};


export default AddBoard;
