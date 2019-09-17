import React, { useState } from "react";
import "./App.css";
import Map from "./components/GoogleMaps/GoogleMap";
// import Fav from "./components/fav";
import Report from "./components/report";
import { SwipeableDrawer } from "@material-ui/core";

const App = () => {
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [isDrawerOpen, toggleDrawer] = useDrawer();
  // const [favorite, setFavorite] = useState(false);

  return (
    <div className="App d-flex">
      <SwipeableDrawer
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Report
          lng={lng}
          lat={lat}
          // favorite={favorite}
          // setFavorite={setFavorite}
        />
      </SwipeableDrawer>
      {/*<Map*/}
      {/*  setLng={setLng}*/}
      {/*  setLat={setLat}*/}
      {/*  onClick={toggleDrawer()}*/}
      {/*  onKeyDown={toggleDrawer()}*/}
      {/*/>*/}
      <Map/>
      {/*<Fav />*/}
    </div>
  );
};

type UseDrawerType = [boolean, (state?: boolean) => React.EventHandler<any>];

function useDrawer(initialState: boolean = false): UseDrawerType {
  const [isOpen, setIsOpen] = useState(initialState);
  function toggleDrawer(state: boolean = !isOpen) {
    return (event: React.KeyboardEvent | React.MouseEvent) => {
      // don't do anything in case of Tab/Shift key press
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen(state);
    };
  }
  return [isOpen, toggleDrawer];
}

export default App;
