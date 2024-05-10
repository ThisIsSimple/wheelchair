import { MarkerF } from "@react-google-maps/api";
import { placeDetailStore } from "../../stores/place-detail-store";
import { PlaceBase } from "../../classes/place-base";

export const FacilityMarkers = ({ facilities }) => {
  return (
    <>
      {facilities.map((item) => {
        const { id, name, address, distance, lat, lng } = item;
        return (
          <MarkerF
            key={id}
            position={{ lat, lng }}
            icon={{
              url: "/facility.svg",
              scaledSize: new google.maps.Size(32, 32),
            }}
            onClick={() =>
              (placeDetailStore.selectedPlace = new PlaceBase({
                id: id,
                name: name ?? "",
                address: address ?? "",
                distance,
                location: { lat, lng },
                additionalInfo: {
                  is_accessibility_entrance: true,
                  is_accessibility_parking: true,
                  // opening_hours,
                },
              }))
            }
          />
        );
      })}
    </>
  );
};
