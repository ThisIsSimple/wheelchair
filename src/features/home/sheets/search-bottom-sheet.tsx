import { observer } from "mobx-react";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import { searchStore } from "../stores/search-store";
import { headingDistanceTo, toLatitudeLongitude } from "geolocation-utils";
import { mapStore } from "../stores/map-store";
import { useRef } from "react";

export const SearchBottomSheet = observer(() => {
  const ref = useRef<BottomSheetRef>(null);

  return (
    <BottomSheet
      ref={ref}
      open={searchStore.isOpen}
      snapPoints={({ maxHeight }) => [maxHeight / 3, maxHeight]}
      blocking={false}
      expandOnContentDrag
    >
      <>
        {searchStore.results.map((item) => {
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
          const distance = headingDistanceTo(
            toLatitudeLongitude(mapStore.currentLocation),
            toLatitudeLongitude(location),
          ).distance;
          return (
            <div
              key={id}
              className="flex items-center gap-3 p-3 border-t"
              onClick={() => {
                mapStore.clickMarker(location);
                ref.current?.snapTo(0);
              }}
            >
              <div className="relative flex-none w-12 h-12">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                )}
                {is_accessible ? (
                  <i className="bg-white rounded-full text-blue-600 absolute w-5 h-5 right-0 bottom-0 fa-solid fa-badge-check fa-lg flex justify-center items-center" />
                ) : null}
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <h3 className="font-bold">{name}</h3>
                  <p className="text-xs text-gray-400">
                    {Math.round(distance)}m
                  </p>
                </div>
                <p className="text-sm text-gray-400">{address}</p>
              </div>
            </div>
          );
        })}
      </>
    </BottomSheet>
  );
});
