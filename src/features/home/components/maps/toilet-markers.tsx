import { MarkerF } from "@react-google-maps/api";
import { placeDetailStore } from "../../stores/place-detail-store";
import { observer } from "mobx-react";
import { PlaceBase } from "../../classes/place-base";

export const ToiletMarkers = observer(({ toilets }) => {
  return toilets.map(({ id, lat, lng, name, distance }) => (
    <MarkerF
      key={id}
      position={{ lat, lng }}
      icon={{
        url: "/toilet.svg",
        scaledSize: new google.maps.Size(32, 32),
      }}
      onClick={() =>
        (placeDetailStore.selectedPlace = new PlaceBase({
          id: id,
          name: name ?? "",
          address: "",
          distance,
          location: { lat, lng },
          additionalInfo: {
            is_accessibility_entrance: true,
            is_accessibility_parking: true,
            opening_hours: "",
          },
        }))
      }
    />
  ));
});
