import { MarkerF } from "@react-google-maps/api";
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
import { searchStore } from "../stores/search-store";
import { headingDistanceTo, toLatitudeLongitude } from "geolocation-utils";
import { placeStore } from "../stores/place-store";
import { suggestionStore } from "../stores/suggestion-store";
import { ToiletMarkers } from "./maps/toilet-markers";
import { FacilityMarkers } from "./maps/facility-markers";

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

    placeStore.init();
  }, [mapStore.centerLocation, mapStore.mapWidth]);

  return (
    <>
      <MarkerF
        position={mapStore.currentLocation}
        icon={{
          url: "/me.svg",
          scaledSize: new google.maps.Size(32, 32),
        }}
      />

      <NavigationPolyline />

      {!mapStore.isNavigationMode && mapStore.showToilets && (
        <ToiletMarkers toilets={toilets} />
      )}
      {!mapStore.isNavigationMode && mapStore.showFacilities && (
        <FacilityMarkers facilities={facilities} />
      )}
      {!mapStore.isNavigationMode &&
        mapStore.showPlaces &&
        searchStore.results.map((item) => {
          const {
            google_place_id: id,
            name,
            address,
            location,
            is_accessibility_entrance,
            is_accessibility_parking,
            thumbnail,
          } = item;
          const is_accessible =
            is_accessibility_entrance || is_accessibility_parking;
          const { lat, lng } = location;
          const distance = headingDistanceTo(
            toLatitudeLongitude(mapStore.currentLocation),
            toLatitudeLongitude(location),
          ).distance;
          return (
            <MarkerF
              key={id}
              position={{ lat, lng }}
              icon={{
                url: is_accessible ? "/food-check.svg" : "/food.svg",
                scaledSize: new google.maps.Size(32, 32),
              }}
              onClick={() =>
                (placeDetailStore.selectedPlace = new PlaceBase({
                  googlePlaceId: id,
                  name: name ?? "",
                  address: address ?? "",
                  distance,
                  thumbnail,
                  location: { lat, lng },
                  additionalInfo: {
                    is_accessibility_entrance,
                    is_accessibility_parking,
                    opening_hours: "",
                  },
                }))
              }
            />
          );
        })}
      {!mapStore.isNavigationMode &&
        mapStore.showPlaces &&
        suggestionStore.places.map((item) => {
          const {
            google_place_id: id,
            name,
            address,
            lat,
            lng,
            is_accessibility_entrance,
            is_accessibility_parking,
            opening_hours,
            thumbnail,
          } = item;
          const distance = headingDistanceTo(
            toLatitudeLongitude(mapStore.currentLocation),
            toLatitudeLongitude({ lat, lng }),
          ).distance;
          const is_accessible =
            is_accessibility_entrance || is_accessibility_parking;
          return (
            <MarkerF
              key={id}
              position={{ lat, lng }}
              icon={{
                url: is_accessible ? "/food-check.svg" : "/food.svg",
                scaledSize: new google.maps.Size(32, 32),
              }}
              onClick={() =>
                (placeDetailStore.selectedPlace = new PlaceBase({
                  googlePlaceId: id,
                  name: name ?? "",
                  address: address ?? "",
                  distance,
                  location: { lat, lng },
                  thumbnail,
                  additionalInfo: {
                    is_accessibility_entrance,
                    is_accessibility_parking,
                    opening_hours,
                  },
                }))
              }
            />
          );
        })}
    </>
  );
});
