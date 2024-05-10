import { makeAutoObservable, runInAction } from "mobx";
import { mapStore } from "./map-store";
import { getNearbyPlaces } from "../../../api/nearby-places";
import { Point } from "../../../types/types";

type Result = {
  id: string;
  address: string;
  address_detail: string;
  google_place_id: string;
  is_accessibility_entrance: boolean;
  is_accessibility_parking: boolean;
  location: Point;
  name: string;
  thumbnail?: string | null;
};

class SearchStore {
  isOpen = false;
  results: Result[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async searchNearbyPlaces(query: string) {
    const { lat, lng } = mapStore.centerLocation;

    const places = await getNearbyPlaces(lat, lng, query);
    console.log(places);

    runInAction(() => {
      searchStore.results = places ?? [];
      searchStore.isOpen = true;
    });
  }

  closeSearch() {
    runInAction(() => {
      this.isOpen = false;
      this.results = [];
    });
  }
}

export const searchStore = new SearchStore();
