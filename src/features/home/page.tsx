import { SearchBar } from "./components/search-bar";
import { FilterBar } from "./components/filter-bar";
import { PlaceDetailBottomSheet } from "./sheets/place-detail-bottom-sheet";
import { SearchBottomSheet } from "./sheets/search-bottom-sheet";
import { mapStore } from "./stores/map-store";
import { observer } from "mobx-react";
import { SuggestionContainer } from "./components/suggestion/container";
import { MapContainer } from "./components/map-container";

export const HomePage = observer(() => {
  return (
    <div>
      {!mapStore.isNavigationMode ? (
        <div className="flex flex-col fixed top-0 left-0 w-full z-[1]">
          <div className="p-3">
            <SearchBar />
          </div>
          <FilterBar />
        </div>
      ) : null}
      {mapStore.isNavigationMode ? (
        <div className="flex flex-col fixed top-0 left-0 w-full z-[1]">
          <div className="p-3">
            <SearchBar />
          </div>
        </div>
      ) : null}

      <MapContainer />

      {!mapStore.isNavigationMode ? (
        <div className="fixed bottom-0 left-0 w-full z-[1] flex flex-col">
          <button
            className="w-12 h-12 rounded-full bg-white shadow self-end mr-3"
            onClick={mapStore.setToCurrentLocation}
          >
            <i className="fa-2xl fa-solid fa-location-crosshairs" />
          </button>
          <SuggestionContainer />
        </div>
      ) : null}

      {!mapStore.isNavigationMode ? <PlaceDetailBottomSheet /> : null}
      {!mapStore.isNavigationMode ? <SearchBottomSheet /> : null}
    </div>
  );
});
