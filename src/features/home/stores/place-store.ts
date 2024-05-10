import { makeAutoObservable } from "mobx";
import { getAccessiblePlaces } from "../../../db/places";
import { mapStore } from "./map-store";

class PlaceStore {
  places = [];

  constructor() {
    makeAutoObservable(this);
  }

  async init() {
    const { lat, lng } = mapStore.centerLocation;
    const response = await getAccessiblePlaces(lat, lng, 100000, true);

    console.log(response);
  }
}

export const placeStore = new PlaceStore();
