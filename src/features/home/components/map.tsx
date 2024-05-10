import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { MapContent } from "./map-content";
import { toLatLon, headingDistanceTo } from "geolocation-utils";
import { runInAction } from "mobx";
import { mapStore } from "../stores/map-store";
import * as _ from "lodash";
import { observer } from "mobx-react";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const styles = {
  default: [],
  hide: [
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "all",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ],
};

interface MapProps {
  center: { lat: number; lng: number };
}

export const Map = observer(({ center }: MapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB1-cCZgx8O_IY8py93a-tWe2Jpw6dKdpA",
  });
  const [map, setMap] = React.useState<GoogleMap | null>(null);
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.setOptions({ styles: styles.hide });
    map.setOptions({
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    });
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    setTimeout(() => (mapStore.zoom = 17), 1000);
  }, []);

  const changeMapCenter = _.debounce(() => {
    if (!map) return;
    const center = map.getCenter();
    runInAction(
      () =>
        (mapStore.centerLocation = { lat: center.lat(), lng: center.lng() }),
    );
  }, 500);

  const getVisualBounds = _.debounce(() => {
    if (!map) return;
    const bounds = map.getBounds();
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    const hd = headingDistanceTo(
      toLatLon([ne.lat(), ne.lng()]),
      toLatLon([sw.lat(), sw.lng()]),
    );
    runInAction(() => (mapStore.mapWidth = hd.distance));
  }, 500);

  const handleZoomChanged = () => {
    if (!map) return;
    runInAction(() => (mapStore.zoom = map.getZoom()));
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={mapStore.zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      clickableIcons={false}
      onBoundsChanged={getVisualBounds}
      onZoomChanged={handleZoomChanged}
      onCenterChanged={changeMapCenter}
      // heading={1}
    >
      <MapContent />
    </GoogleMap>
  ) : (
    <></>
  );
});
