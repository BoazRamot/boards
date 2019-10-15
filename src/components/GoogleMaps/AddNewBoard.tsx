import React from "react";
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Divider,
  TextField,
} from "@material-ui/core";

interface IProps {
  mapRef: any
  handleNewBoardClose: Function
  openNewBoard: boolean
  address: string
}

const AddNewBoard: React.FC<IProps> = ({ mapRef, handleNewBoardClose, openNewBoard, address }) => {

  const sendNewBoard = (event: any) => {
    const form = event.target.parentNode.parentNode.parentNode;
    const name = form.querySelector('#name').value;
    const address = form.querySelector('#address').value;
    const description = form.querySelector('#description').value;
    console.log(name);
    console.log(address);
    const map = (mapRef.current as any).state.map;
    const latLng = { lat: map.center.lat(), lng: map.center.lng() };
    const board = {
      latLng,
      name,
      address: address,
      description
      // id: 1,
      // postsId: 1
    };
    console.log(board);
    handleNewBoardClose();
  };

  return (
    <div>
      <Dialog open={openNewBoard} onClose={() => handleNewBoardClose()} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Board Name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Board Name"
            type="text"
            fullWidth
            defaultValue={address}
          />
          <br/>
          <Divider />
          <br/>
          <DialogContentText>
            Board Address
          </DialogContentText>
          <TextField
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            value={address}
          />
          <br/>
          <Divider />
          <br/>
          <DialogContentText>
            Board Description
          </DialogContentText>
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            placeholder='Enter Board Description'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleNewBoardClose()} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={(event) => {sendNewBoard(event)}}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNewBoard;
