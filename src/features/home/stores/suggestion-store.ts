import { makeAutoObservable } from "mobx";
import { getAccessiblePlaces } from "../../../db/places";
import { mapStore } from "./map-store";
import { NearbyPlaces } from "../../../db/places/types";

class SuggestionStore {
  places: NearbyPlaces = [];

  constructor() {
    makeAutoObservable(this);
  }

  async init() {
    const { lat, lng } = mapStore.centerLocation;
    const response = await getAccessiblePlaces(lat, lng, 100000, true);

    this.places = response ?? [];
  }
}

export const suggestionStore = new SuggestionStore();
