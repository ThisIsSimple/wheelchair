import axios from "axios";

const URL = "https://wheel.wafflediary.com/near";

export const getNearbyPlaces = async (
  lat: number,
  lng: number,
  query: string,
) => {
  const response = await axios.post(URL, { lat, lon: lng, food: query });
  return response.data.map((item) => {
    const group = item.location.match(/Point\(([\d|.]*)\s([\d|.]*)\)/);
    return {
      ...item,
      location: {
        lat: parseFloat(group[2]),
        lng: parseFloat(group[1]),
      },
    };
  });
};
