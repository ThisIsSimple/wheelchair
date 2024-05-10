import axios from "axios";

const URL = "https://places.googleapis.com/v1/places:searchText";

export const googleTextSearch = async (query: string) => {
  const response = await axios.post(
    URL,
    {
      textQuery: query,
    },
    {
      headers: {
        "X-Goog-Api-Key": "AIzaSyB1-cCZgx8O_IY8py93a-tWe2Jpw6dKdpA",
        "X-Goog-FieldMask":
          "places.id,places.location,places.displayName,places.formattedAddress,places.priceLevel",
      },
    },
  );

  return response.data?.places ?? [];
};
