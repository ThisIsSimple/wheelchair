import { makeAutoObservable } from "mobx";

class AppStore {
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }
}

export const appStore = new AppStore();
