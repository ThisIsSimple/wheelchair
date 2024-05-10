import { makeAutoObservable } from "mobx";

type Result = {
  id: string;
  formattedAddress: string;
  displayName: {
    languageCode: string;
    text: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
};

class SearchStore {
  isOpen = false;
  results: Result[] = [];

  constructor() {
    makeAutoObservable(this);
  }
}

export const searchStore = new SearchStore();
