import { useGeolocated } from "react-geolocated";
import { Map } from "./map";
import { useEffect } from "react";
import { runInAction } from "mobx";
import { mapStore } from "../stores/map-store";
import { observer } from "mobx-react";

export const MapContainer = observer(() => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      runInAction(() => {
        mapStore.centerLocation = {
          lat: coords.latitude,
          lng: coords.longitude,
        };
        mapStore.currentLocation = {
          lat: coords.latitude,
          lng: coords.longitude,
        };
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
        <Map center={mapStore.centerLocation} />
      ) : null}
    </>
  );
});
