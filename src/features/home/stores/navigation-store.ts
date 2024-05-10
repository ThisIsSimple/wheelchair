import { makeAutoObservable, runInAction } from "mobx";
import { NavigationResponse } from "../../../api/navigation";
import { Point } from "../../../types/types";
import { placeDetailStore } from "./place-detail-store";
import { mapStore } from "./map-store";

class NavigationStore {
  currentInfo: Record<string, string> | null = null;
  startPoint: Point | null = null;
  endPoint: Point | null = null;
  currentNavigationInfo: NavigationResponse | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async startNavigation() {
    const navigationInfo = await placeDetailStore.getNavigationOfPlaceDetail();
    runInAction(() => {
      navigationStore.startPoint = mapStore.currentLocation;
      navigationStore.endPoint =
        placeDetailStore.selectedPlace?.location ?? null;
      navigationStore.currentNavigationInfo = navigationInfo ?? null;
      mapStore.centerLocation = navigationStore.startPoint;
      mapStore.isNavigationMode = true;

      if (this.startPoint) mapStore.centerLocation = this.startPoint;
      mapStore.zoom = 18;
    });
  }
}

export const navigationStore = new NavigationStore();
