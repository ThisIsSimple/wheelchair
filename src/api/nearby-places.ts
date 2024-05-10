import axios from "axios";

const URL =
  "http://ec2-13-125-245-103.ap-northeast-2.compute.amazonaws.com:5000/near";

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
