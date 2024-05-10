import { supabase } from "../../utils/supabase";

export const getNearbyFacilities = async (
  lat: number,
  lng: number,
  d: number,
) => {
  const response = await supabase.rpc("nearby_facilities", {
    lat,
    lng,
    d,
  });
  return response?.data ?? [];
};
