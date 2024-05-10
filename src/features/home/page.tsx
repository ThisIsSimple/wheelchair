import { Map } from "./components/map";
import { SearchBar } from "./components/search-bar";
import { FilterBar } from "./components/filter-bar";
import { PlaceDetailBottomSheet } from "./sheets/place-detail-bottom-sheet";
import { SearchBottomSheet } from "./sheets/search-bottom-sheet";
import { mapStore } from "./stores/map-store";

export const HomePage = () => {
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

      <Map
        center={{
          lat: 37.239311,
          lng: 127.0834,
        }}
      />

      {!mapStore.isNavigationMode ? <PlaceDetailBottomSheet /> : null}
      {!mapStore.isNavigationMode ? <SearchBottomSheet /> : null}
    </div>
  );
};
