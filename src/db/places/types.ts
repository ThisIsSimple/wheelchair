import { Database } from "../../types/database.types";

export type Place = Database["public"]["Tables"]["places"]["Row"];

export type NearbyPlaces =
  Database["public"]["Functions"]["nearby_places"]["Returns"];
