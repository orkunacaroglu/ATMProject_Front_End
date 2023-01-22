import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../apis/api";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import mapStyles from "./mapStyles";

function Detail() {
  const [detailATM, setDetailATM] = useState([]);
  const [libraries] = useState(["places"]);

  const params = useParams();
  const navigate = useNavigate();
  const GetDetailATM = async () => {
    try {
      const response = await api().get(`/ATMs/${params?.id}`);

      setDetailATM(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetDetailATM();
  //eslint-disable-next-line
  }, []);

  // MAP SETTINGS
  const mapContainerStyle = {
    paddingTop: "20px",
    width: "50%",
    height: "48.2vh",
  };

  const center = {
    lat: Number(detailATM.atM_Latitude),
    lng: Number(detailATM.atM_Longitude),
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

  //--------------------------------------------
  const handleClick = () => {
    navigate("/", { replace: true });
  };

  return (
    <Box
      style={{
        paddingTop: "200px",
        fontSize: "1em",
        position: "relative",
      }}
      flex={14}
      p={2}
    >
      <div className=" mb-3 mt-3">
        <div
          style={{ position:"absolute", top:"170px", left:"61.3%" }}
        >
          <Button variant="contained" onClick={handleClick}>
            Back
          </Button>
        </div>
        <div className="d-flex gap-4">
          <table className="table table-stripted table-bordered">
            <tbody>
              <tr className="table-info">
                <th scope="row">ATM ID:</th>
                <td>{detailATM.atM_ID}</td>
              </tr>
              <tr className="table-active">
                <th scope="row">ATM NAME:</th>
                <td>{detailATM.atM_Name}</td>
              </tr>
              <tr className="table-info">
                <th scope="row">ZIP CODE:</th>
                <td>{detailATM.atM_ZIPCode}</td>
              </tr>
              <tr className="table-active">
                <th scope="row">PROVINCE NAME:</th>
                <td>{detailATM.province_Name}</td>
              </tr>
              <tr className="table-info">
                <th scope="row">CITY NAME:</th>
                <td>{detailATM.city_Name}</td>
              </tr>
              <tr className="table-active">
                <th scope="row">LATITUDE:</th>
                <td>{detailATM.atM_Latitude}</td>
              </tr>
              <tr className="table-info">
                <th scope="row">LONGITUDE:</th>
                <td>{detailATM.atM_Longitude}</td>
              </tr>
              <tr className="table-active">
                <th scope="row">ATM ADDRESS:</th>
                <td>{detailATM.atM_Address}</td>
              </tr>
              <tr className="table-info">
                <th scope="row">ATM STATUS:</th>
                <td>{detailATM.atM_Status ? "Active" : "Passive"}</td>
              </tr>
              <tr className="table-active">
                <th scope="row">CREATED DATE:</th>
                <td>{detailATM.createdDate}</td>
              </tr>
              <tr className="table-info">
                <th scope="row">UPDATED DATE:</th>
                <td>{detailATM.updatedDate}</td>
              </tr>
            </tbody>
          </table>
          {detailATM.atM_Name && (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={center}
            options={options}
          >
            <MarkerF
              key={detailATM.id}
              position={{
                lat: detailATM.atM_Latitude,
                lng: detailATM.atM_Longitude,
              }}
            />
          </GoogleMap>
          )}
          
        </div>
      </div>
    </Box>
  );
}
export default Detail;
