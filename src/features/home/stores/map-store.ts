import { makeAutoObservable } from "mobx";

type Point = {
  lat: number;
  lng: number;
};

class MapStore {
  centerLocation: Point = {
    lat: 37.239311,
    lng: 127.0834,
  };
  currentLocation: Point = {
    lat: 37.239311,
    lng: 127.0834,
  };
  mapWidth: number = 0;

  isNavigationMode: boolean = false;
  showToilets: boolean = true;
  showFacilities: boolean = true;
  showPlaces: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }
}

export const mapStore = new MapStore();
