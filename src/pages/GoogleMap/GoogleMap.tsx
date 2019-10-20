import React from "react";
import {useLoadScript} from "@react-google-maps/api";
import GoogleMapService from "../../components/GoogleMaps/GoogleMapService/GoogleMapService";
import keys from "../../config/keys";
import {CircularProgress, createStyles, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2),
    },
  }),
);

const libraries = ["places"];

const Map = () => {
  const classes = useStyles();
  const { isLoaded } = useLoadScript({
    id: "script-loader",
    googleMapsApiKey: keys.googleMapsApiKey,
    version: "weekly",
    libraries: libraries,
    language: "en"
  });

  return isLoaded ? <GoogleMapService /> : <CircularProgress className={classes.progress} />;
};

export default Map;