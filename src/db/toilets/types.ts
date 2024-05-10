import { Database } from "../../types/database.types";

export type Toilet = Database["public"]["Tables"]["toilets"]["Row"];

export type NearbyToilets =
  Database["public"]["Functions"]["nearby_toilets"]["Returns"];
