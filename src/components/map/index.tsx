import React, { useContext, useEffect, useRef, useState } from "react"
import { connect } from "react-redux";
import { GoogleMapsApiContext } from "../../modules/google-maps-context"
import { Box } from "@mui/material";

const defaultLat: number = 3.138506;
const defaultLng: number = 101.68699;

type StateLatLng = {
  lat: number;
  long: number;
};

type MapStateToPropsType = {
  selectedPlace: StateLatLng;
};

type ComponentProps = {};

type MapComponentProps = MapStateToPropsType & ComponentProps;

const mapStateToProps = (state) => ({
  ...state.selectedPlace
});

const MapComponent: React.FC<MapComponentProps> = (props) => {
  const { maps } = useContext(GoogleMapsApiContext);
  const [isMapOffline, setIsMapOffline] = useState<boolean>(true);
  const mapRef = useRef<google.maps.Map>();
  const { selectedPlace } = props;

  useEffect(() => {
    if (maps === undefined) {
      setIsMapOffline(true);
      return;
    }

    setIsMapOffline(false);
  }, [maps]);

  useEffect(() => {
    if (isMapOffline) return;

    // Need to declare it here because the google API would not be fetched and initialized until
    // the app initialized it via the useGoogleMapsApi() hook
    const defaultMapOpts = {
      center: new window.google.maps.LatLng(defaultLat, defaultLng),
      zoom: 5,
    };

    mapRef.current = new maps.Map(document.getElementById('map'), defaultMapOpts);
  }, [isMapOffline]);

  useEffect(() => {
    if (mapRef.current === undefined) return;

    const { lat, long } = selectedPlace;
    const panToLatLng = { lat, lng: long };
    console.log(panToLatLng)

    // Pan to area on map
    mapRef.current.panTo(panToLatLng);
  }, [selectedPlace])

  return (
    <div>
      {
        isMapOffline ?
          (
            <Box
              height={500}
              width={700}
              my={5}
              alignItems='center'
              sx={{ border: '2px solid grey' }}
              justifyContent='center'
              display="flex"
              fontSize={30}
              color='black'
            >
              Maps are currently offline
            </Box>
          )
          :
          (
            <div>
              <div id="map" style={{ height: 500, width: 700, margin: 20 }}></div>
            </div >
          )
      }
    </div>
  )
}

const memoizedMap = React.memo(MapComponent);
const connector = connect<MapStateToPropsType, {}>(mapStateToProps, null)
export default connector(memoizedMap);
