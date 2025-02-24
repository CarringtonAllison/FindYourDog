import { AxiosResponse } from "axios";
import api from "./configs/axiosConfig";

interface Coordinates {
  lat: number;
  lon: number;
}

export async function getLocations(
  zipCodes: string[]
): Promise<AxiosResponse<any>> {
  const response: AxiosResponse = await api
    .post("/locations", zipCodes)
    .catch((error) => {
      console.log("Error:", error);
      throw error;
    });
  return response;
}

export async function getLocationSearch(
  city?: string[] | null,
  states?: string | null,
  geoBoundingBox?: {
    top?: Coordinates;
    left?: Coordinates;
    bottom?: Coordinates;
    right?: Coordinates;
    bottom_left?: Coordinates;
    top_left?: Coordinates;
  } | null,
  size?: number | null,
  from?: number | null
): Promise<AxiosResponse<any>> {
  const response: AxiosResponse = await api
    .get("/locations/search", {
      params: {
        city: city ?? null,
        states: states ?? null,
        geoBoundingBox: geoBoundingBox ?? null,
        size: size ?? 25,
        from: from ?? 0,
      },
    })
    .catch((error) => {
      console.log("Error:", error);
      throw error;
    });
  console.log("response", response);
  return response;
}
