import { useGeolocated } from "react-geolocated";
import { Map } from "./map";
import { useEffect } from "react";
import { runInAction, toJS } from "mobx";
import { mapStore } from "../stores/map-store";
import { observer } from "mobx-react";

export const MapContainer = observer(() => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 10000,
      watchPosition: true,
    });

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      runInAction(() => {
        mapStore.currentLocation = {
          lat: coords.latitude,
          lng: coords.longitude,
        };
        console.log(toJS(mapStore.currentLocation));
      });
    }
  }, [coords, isGeolocationAvailable, isGeolocationEnabled]);

  return (
    <>
      {!isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
      ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
      ) : coords ? (
        <Map />
      ) : null}
    </>
  );
});
