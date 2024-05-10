import { makeAutoObservable } from "mobx";
import { NavigationResponse } from "../../../api/navigation";

class NavigationStore {
  currentNavigationInfo: NavigationResponse | null = null;

  constructor() {
    makeAutoObservable(this);
  }
}

export const navigationStore = new NavigationStore();
