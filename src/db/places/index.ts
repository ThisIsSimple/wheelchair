import { supabase } from "../../utils/supabase";

export const getAccessiblePlaces = async (
  lat: number,
  lng: number,
  distance: number,
  checkAccessibility: boolean,
) => {
  const response = await supabase.rpc("nearby_places", {
    lat,
    lng,
    d: distance,
    accessibility: checkAccessibility,
  });
  return response.data;
};
