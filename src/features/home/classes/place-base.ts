import { Point } from "../../../types/types";

export class PlaceBase {
  public id?: number | null = null;
  public googlePlaceId?: string | null = null;
  public name: string = "";
  public distance: number = 0;
  public location: Point = { lat: 0, lng: 0 };
  public address: string = "";
  public thumbnail?: string | null = null;
  public additionalInfo?: Record<string, any> | null = null;

  constructor({
    id,
    googlePlaceId,
    name,
    distance,
    location,
    address,
    thumbnail,
    additionalInfo,
  }: {
    id?: number | null;
    googlePlaceId?: string | null;
    name?: string;
    distance?: number;
    location?: Point;
    address?: string;
    thumbnail?: string | null;
    additionalInfo?: Record<string, any> | null;
  }) {
    this.id = id;
    this.googlePlaceId = googlePlaceId;
    this.name = name ?? "";
    this.distance = distance ?? 0;
    this.location = location ?? { lat: 0, lng: 0 };
    this.address = address ?? "";
    this.thumbnail = thumbnail ?? null;
    this.additionalInfo = additionalInfo ?? null;
  }
}
