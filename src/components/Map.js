import { Box } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import { api } from "../apis/api";

export default function Map() {
  const [markers, setMarkers] = useState([]);
  const [libraries] = useState(["places"]);
  const [selected, setSelected] = useState(null);

  
  const mapRef = useRef();
  const onMapLoad = useCallback((map) =>{
    mapRef.current = map;
  })
  const getMarkerInfo = async () => {
    try {
      const response = await api().get("/ATMs");
      setMarkers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMarkerInfo();
  }, []);

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };
  const center = {
    lat: 	39.925533,
    lng: 36.844051,
  };

  const options = {    
    styles: mapStyles.mapStyle,
    disableDefaultUI: true,
    zoomControl: true,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAAwj35Mc0RW8BgaiwoJVDimSwxGfLD5fM",
    libraries: libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";




  return (
    <Box style={{paddingTop: "70px"}} flex={14} p={2}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
      >
        {markers.map((marker) => (
          <Marker
            position={{ lat: marker.atM_Latitude, lng: marker.atM_Longitude }}
            key={marker.id}
            onLoad={onMapLoad}
            title={marker.atM_Name}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {selected ?(
          <InfoWindow
            position={{ lat: selected.atM_Latitude, lng: selected.atM_Longitude }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h3>{selected.atM_Name}</h3>
              <p>Address: {selected.atM_Address}</p>
              <p>Lat: {selected.atM_Latitude} - Long: {selected.atM_Longitude}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </Box>
  );
}
