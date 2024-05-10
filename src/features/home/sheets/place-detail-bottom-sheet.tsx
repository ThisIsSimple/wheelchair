import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import { observer } from "mobx-react-lite";
import { placeDetailStore } from "../stores/place-detail-store";
import { runInAction } from "mobx";
import { useRef } from "react";
import { navigationStore } from "../stores/navigation-store";
import { mapStore } from "../stores/map-store";

export const PlaceDetailBottomSheet = observer(() => {
  const focusRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<BottomSheetRef>(null);

  const handleNavigate = async () => {
    const navigationInfo = await placeDetailStore.getNavigationOfPlaceDetail();
    runInAction(() => {
      navigationStore.currentNavigationInfo = navigationInfo ?? null;
      mapStore.isNavigationMode = true;
    });
  };

  return (
    <BottomSheet
      open={!!placeDetailStore.selectedPlace}
      onDismiss={() =>
        runInAction(() => (placeDetailStore.selectedPlace = null))
      }
      ref={sheetRef}
      initialFocusRef={focusRef}
      defaultSnap={({ maxHeight }) => maxHeight / 2}
      snapPoints={({ maxHeight }) => [maxHeight, maxHeight / 2]}
      expandOnContentDrag={true}
      className="no-scrollbar"
    >
      <div className="no-scrollbar">
        <header className="flex justify-between items-center p-3">
          <div>
            <h1 className="font-bold text-lg">
              {placeDetailStore.selectedPlace?.name}
            </h1>
            <p className="text-sm text-gray-300">
              {placeDetailStore.selectedPlace?.distance}m
            </p>
          </div>
          <button
            className="bg-blue-500 text-white rounded-full px-3 py-2 text-sm"
            onClick={handleNavigate}
          >
            길찾기
          </button>
        </header>

        <section>
          {placeDetailStore.selectedPlace?.address}
          <img src="https://cdn.aitimes.com/news/photo/202312/155726_166889_3425.jpg" />
        </section>
      </div>
    </BottomSheet>
  );
});
