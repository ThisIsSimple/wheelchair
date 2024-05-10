import { supabase } from "../../utils/supabase";

export const getToilets = async () => {
  const toilets = await supabase.from("toilets").select("*");

  return toilets.data;
};

export const getNearbyToilets = async (
  lat: number,
  lng: number,
  distance: number,
) => {
  const toilets = await supabase.rpc("nearby_toilets", {
    lat,
    lng,
    d: distance,
  });

  return toilets.data;
};
