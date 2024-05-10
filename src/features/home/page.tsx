import { SearchBar } from "./components/search-bar";
import { FilterBar } from "./components/filter-bar";
import { PlaceDetailBottomSheet } from "./sheets/place-detail-bottom-sheet";
import { SearchBottomSheet } from "./sheets/search-bottom-sheet";
import { mapStore } from "./stores/map-store";
import { observer } from "mobx-react";
import { SuggestionContainer } from "./components/suggestion/container";
import { MapContainer } from "./components/map-container";
import { useGeolocated } from "react-geolocated";
import { useEffect } from "react";
import { runInAction } from "mobx";
import { NavigationBar } from "./components/maps/navigation-bar";
import { navigationStore } from "./stores/navigation-store";

export const HomePage = observer(() => {
  const { coords, getPosition } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 10000,
    watchPosition: true,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (mapStore.isNavigationMode) {
      interval = setInterval(() => {
        getPosition();
        runInAction(() => {
          mapStore.centerLocation = mapStore.currentLocation;
          if (coords)
            mapStore.currentLocation = {
              lat: coords.latitude,
              lng: coords.longitude,
            };
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [mapStore.isNavigationMode]);

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
            <NavigationBar />
          </div>
        </div>
      ) : null}

      <MapContainer />

      {!mapStore.isNavigationMode ? (
        <div className="fixed bottom-0 left-0 w-full z-[1] flex flex-col">
          <button
            className="w-12 h-12 rounded-full bg-white shadow self-end mr-3"
            onClick={() => {
              getPosition();
              mapStore.setToCurrentLocation();
            }}
          >
            <i className="fa-2xl fa-solid fa-location-crosshairs" />
          </button>
          <SuggestionContainer />
        </div>
      ) : null}

      {mapStore.isNavigationMode ? (
        <div className="fixed bottom-10 left-1/2 w-full z-[1] flex flex-col items-center justify-center -translate-x-1/2">
          <button
            className="w-16 h-16 rounded-full bg-red-500 text-white shadow mr-3"
            onClick={() => {
              runInAction(() => {
                navigationStore.currentNavigationInfo = null;
                navigationStore.currentInfo = null;
                navigationStore.startPoint = null;
                navigationStore.endPoint = null;
                mapStore.isNavigationMode = false;
              });
            }}
          >
            <i className="fa-2xl fa-solid fa-xmark" />
          </button>
        </div>
      ) : null}

      {!mapStore.isNavigationMode ? <PlaceDetailBottomSheet /> : null}
      {!mapStore.isNavigationMode ? <SearchBottomSheet /> : null}
    </div>
  );
});
