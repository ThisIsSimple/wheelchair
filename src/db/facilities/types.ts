import { Database } from "../../types/database.types";

export type Facility =
  Database["public"]["Tables"]["disability_facilities"]["Row"];

export type NearbyFaclities =
  Database["public"]["Functions"]["facilities"]["Returns"];
