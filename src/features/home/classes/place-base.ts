import { Point } from "../../../types/types";

export class PlaceBase {
  public id?: number | null = null;
  public googlePlaceId?: string | null = null;
  public name: string = "";
  public distance: number = 0;
  public location: Point = { lat: 0, lng: 0 };
  public address: string = "";

  constructor({
    id,
    googlePlaceId,
    name,
    distance,
    location,
    address,
  }: {
    id?: number | null;
    googlePlaceId?: string | null;
    name?: string;
    distance?: number;
    location?: Point;
    address?: string;
  }) {
    this.id = id;
    this.googlePlaceId = googlePlaceId;
    this.name = name ?? "";
    this.distance = distance ?? 0;
    this.location = location ?? { lat: 0, lng: 0 };
    this.address = address ?? "";
  }
}
