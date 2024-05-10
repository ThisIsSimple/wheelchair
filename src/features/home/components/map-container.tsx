import { useGeolocated } from "react-geolocated";
import { Map } from "./map";
import { useEffect } from "react";
import { runInAction } from "mobx";
import { mapStore } from "../stores/map-store";
import { observer } from "mobx-react";

export const MapContainer = observer(() => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 100000,
      watchPosition: true,
    });

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isGeolocationAvailable && isGeolocationEnabled) getPosition();
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      mapStore.centerLocation = {
        lat: coords.latitude,
        lng: coords.longitude,
      };

      interval = setInterval(() => {
        getPosition();

        runInAction(() => {
          mapStore.currentLocation = {
            lat: coords.latitude,
            lng: coords.longitude,
          };
        });
      }, 1000);
    } else {
      getPosition();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [coords, isGeolocationAvailable, isGeolocationEnabled]);

  return (
    <>
      <Map center={mapStore.centerLocation} />
      {/* {!isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
      ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
      ) : coords ? (
        <Map center={mapStore.centerLocation} />
      ) : null} */}
    </>
  );
});
