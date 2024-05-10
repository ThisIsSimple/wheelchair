import { Marker, Polyline } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import type { NearbyToilets } from "../../../db/toilets/types";
import type { NearbyFaclities } from "../../../db/facilities/types";
import { getNearbyToilets } from "../../../db/toilets";
import { observer } from "mobx-react";
import { mapStore } from "../stores/map-store";
import { placeDetailStore } from "../stores/place-detail-store";
import { PlaceBase } from "../classes/place-base";
import { getNearbyFacilities } from "../../../db/facilities";
import { NavigationPolyline } from "./maps/navigation-polyline";

export const MapContent = observer(() => {
  const [toilets, setToilets] = useState<NearbyToilets>([]);
  const [facilities, setFacilities] = useState<NearbyFaclities>([]);

  useEffect(() => {
    const { lat, lng } = mapStore.centerLocation;
    getNearbyToilets(lat, lng, mapStore.mapWidth).then((data) =>
      setToilets(data ?? []),
    );
    getNearbyFacilities(lat, lng, mapStore.mapWidth).then((data) =>
      setFacilities(data),
    );
  }, [mapStore.centerLocation, mapStore.mapWidth]);

  return (
    <>
      <NavigationPolyline />
      {!mapStore.isNavigationMode &&
        mapStore.showToilets &&
        toilets.map(({ id, lat, lng, name, distance }) => (
          <Marker
            key={id}
            position={{ lat, lng }}
            onClick={() =>
              (placeDetailStore.selectedPlace = new PlaceBase({
                id: id,
                name: name ?? "",
                address: "",
                distance,
                location: { lat, lng },
              }))
            }
          />
        ))}
      {!mapStore.isNavigationMode &&
        mapStore.showFacilities &&
        facilities.map((item) => {
          const { id, name, address, distance, lat, lng } = item;
          return (
            <Marker
              key={id}
              position={{ lat, lng }}
              onClick={() =>
                (placeDetailStore.selectedPlace = new PlaceBase({
                  id: id,
                  name: name ?? "",
                  address: address ?? "",
                  distance,
                  location: { lat, lng },
                }))
              }
            />
          );
        })}
    </>
  );
});
