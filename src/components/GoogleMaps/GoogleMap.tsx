import React from "react";
import {useLoadScript} from "@react-google-maps/api";
import GoogleMapService from "./GoogleMapService";
import keys from "../../config/keys";

const libraries = ["places"];

const Map = () => {
  const { isLoaded } = useLoadScript({
    id: "script-loader",
    googleMapsApiKey: keys.googleMapsApiKey,
    version: "weekly",
    libraries: libraries,
    language: "en"
  });


  return isLoaded ? <GoogleMapService /> : <h1>App doesn't work</h1>;
};

export default Map;