import { supabase } from "../../utils/supabase";
import { Place } from "./types";

export const getNearbyPlaces = async (
  lat: number,
  lng: number,
  distance: number,
) => {};

export const getAccessiblePlaces: Promise<Place[]> = async () => {
  const response = await supabase
    .from("places")
    .select("*")
    .or("is_accessibility_enterance.eq.1, is_accessibility_parking.eq.1");
  return response.data;
};
