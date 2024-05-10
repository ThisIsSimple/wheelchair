import { makeAutoObservable } from "mobx";
import { suggestionStore } from "./suggestion-store";

type Point = {
  lat: number;
  lng: number;
};

class MapStore {
  centerLocation: Point = {
    lat: 36.139311,
    lng: 127.10834,
  };
  currentLocation: Point = {
    lat: 36.139311,
    lng: 127.10834,
  };
  mapWidth: number = 0;

  zoom: number = 15;

  isNavigationMode: boolean = false;
  showToilets: boolean = false;
  showFacilities: boolean = false;
  showPlaces: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  clickMarker = (location: Point) => {
    this.centerLocation = location;
    this.zoom = 18;
  };

  setToCurrentLocation = async () => {
    this.centerLocation = this.currentLocation;
    this.zoom = 16;
    await suggestionStore.init();
  };
}

export const mapStore = new MapStore();
