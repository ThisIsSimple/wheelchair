import axios from "axios";
import { Point } from "../types/types";

export interface NavigationResponse {
  type: string;
  features: {
    type: string;
    geometry: {
      type: string;
      coordinates: [number, number] | [number, number][];
    };
    properties: {
      totalDistance: number;
      totalTime: number;
      index: number;
      pointIndex: number;
      name: string;
      description: string;
      direction: string;
      nearPoiName: string;
      nearPoiX: string;
      nearPoiY: string;
      intersectionName: string;
      facilityType: string;
      facilityName: string;
      turnType: number;
      pointType: string;
    };
  }[];
}

const BASE_URL =
  "http://ec2-13-125-245-103.ap-northeast-2.compute.amazonaws.com:5000";

export const getNavigationByDirection = async (start: Point, end: Point) => {
  const response = await axios.post<NavigationResponse>(
    BASE_URL + "/direction",
    { start: [start.lat, start.lng], end: [end.lat, end.lng], option: "30" },
  );
  return response.data;
};
