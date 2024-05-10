import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import { observer } from "mobx-react-lite";
import { placeDetailStore } from "../stores/place-detail-store";
import { runInAction } from "mobx";
import { useRef } from "react";
import { navigationStore } from "../stores/navigation-store";
import toast from "react-hot-toast";
import { appStore } from "../../../shared/stores/app-store";

export const PlaceDetailBottomSheet = observer(() => {
  const focusRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<BottomSheetRef>(null);

  const handleNavigate = async () => {
    try {
      appStore.isLoading = true;
      await navigationStore.startNavigation();
    } catch (e) {
      console.error(e);
      toast.error("길찾기에 실패했습니다.");
    } finally {
      appStore.isLoading = false;
    }
  };

  console.log(placeDetailStore.selectedPlace);

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
      {placeDetailStore.selectedPlace ? (
        <div className="no-scrollbar">
          <header className="flex justify-between items-center p-3">
            <div>
              <h1 className="font-bold text-lg">
                {placeDetailStore.selectedPlace?.name}
              </h1>
              <p className="text-sm text-gray-400">
                {Math.round(placeDetailStore.selectedPlace?.distance ?? 0)}m
              </p>
            </div>
            <button
              className="bg-blue-500 text-white rounded-full px-3 py-2 text-sm"
              onClick={handleNavigate}
            >
              길찾기
            </button>
          </header>

          <hr />

          <section className="p-3">
            <header className="mb-3">
              <h2 className="font-bold text-base">휠체어 접근성</h2>
            </header>

            <div className="flex items-baseline gap-3">
              {placeDetailStore.selectedPlace?.additionalInfo
                ?.is_accessibility_parking ? (
                <div className="flex flex-col items-center gap-5 mt-5">
                  <i className="fa-solid fa-circle-parking fa-2xl" />
                  <p className="text-sm">주차가능</p>
                </div>
              ) : null}

              {placeDetailStore.selectedPlace?.additionalInfo
                ?.is_accessibility_entrance ? (
                <div className="flex flex-col items-center gap-5 mt-5">
                  <i className="fa-solid fa-wheelchair fa-2xl" />
                  <p className="text-sm">경사로 입구</p>
                </div>
              ) : null}

              {!placeDetailStore.selectedPlace?.additionalInfo
                ?.is_accessibility_parking &&
              !placeDetailStore.selectedPlace?.additionalInfo
                ?.is_accessibility_entrance ? (
                <div className="flex flex-col items-center gap-5 mt-5">
                  <i className="fa-solid fa-ban fa-2xl" />
                  <p className="text-sm">제공안함</p>
                </div>
              ) : null}
            </div>
          </section>

          <hr />

          <section className="p-3">
            {placeDetailStore.selectedPlace.address}
            {placeDetailStore.selectedPlace.thumbnail ? (
              <img src={placeDetailStore.selectedPlace.thumbnail} />
            ) : null}
          </section>
        </div>
      ) : null}
    </BottomSheet>
  );
});
