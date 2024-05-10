import { makeAutoObservable } from "mobx";
import { PlaceBase } from "../classes/place-base";
import { getNavigationByDirection } from "../../../api/navigation";
import { mapStore } from "./map-store";

class PlaceDetailStore {
  selectedPlace: PlaceBase | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getNavigationOfPlaceDetail() {
    if (!this.selectedPlace) return;

    const response = await getNavigationByDirection(
      mapStore.currentLocation,
      this.selectedPlace.location,
    );

    console.log(response);

    return response;
  }
}

export const placeDetailStore = new PlaceDetailStore();
