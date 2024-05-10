import { headingDistanceTo, toLatitudeLongitude } from "geolocation-utils";
import { Place } from "../../../../db/places/types";
import { mapStore } from "../../stores/map-store";
import { toJS } from "mobx";
import { placeDetailStore } from "../../stores/place-detail-store";
import { PlaceBase } from "../../classes/place-base";

interface Props {
  place: Place;
}

export const SuggestionItem = ({ place }: Props) => {
  const {
    google_place_id: id,
    name,
    address,
    lat,
    lng,
    is_accessibility_entrance,
    is_accessibility_parking,
    thumbnail,
  } = place;
  const is_accessible = is_accessibility_entrance || is_accessibility_parking;
  const distance = headingDistanceTo(
    toLatitudeLongitude(mapStore.currentLocation),
    toLatitudeLongitude({ lat, lng }),
  ).distance;

  return (
    <div
      className="bg-white rounded-xl p-3 shadow flex items-center gap-3 h-[72px]"
      onClick={() => {
        mapStore.centerLocation = { lat, lng };
        placeDetailStore.selectedPlace = new PlaceBase({
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
        });
      }}
    >
      {place.thumbnail ? (
        <img
          src={place.thumbnail}
          className="w-12 h-12 rounded-xl object-cover"
        />
      ) : null}

      <div>
        <h3 className="font-bold line-clamp-1">{place.name}</h3>
        <p className="text-gray-400 text-xs line-clamp-1">
          {Math.round(place?.distance ?? 0)}m
        </p>
      </div>
    </div>
  );
};
