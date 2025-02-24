import { AxiosResponse } from "axios";
import api from "./configs/axiosConfig";

export async function getBreeds(): Promise<AxiosResponse<any>> {
  const response: AxiosResponse = await api
    .get("/dogs/breeds")
    .catch((error) => {
      console.log("Error:", error);
      throw error;
    });
  return response;
}

export async function getDogSearch(
    breeds?: string[] | null,
    zipCodes?: number[] | null,
    sort?: string | null,
    page?: number | null,
    limit?: number | null,
    size?: number | null,
    from?: number | null,
    ageMin?: number | null,
    ageMax?: number | null
  ): Promise<AxiosResponse<any>> {
    const response: AxiosResponse = await api
      .get("/dogs/search", {
        params: {
          breeds: breeds ?? [],
          zipCodes: zipCodes ?? [],
          sort: sort ?? "breed:asc",
          page: page ?? 1,
          limit: limit ?? 25,
          size: size ?? 25,
          from: from ?? 0,
          ageMin: ageMin ?? 0,
          ageMax: ageMax ?? 50,
        },
      })
      .catch((error) => {
        console.log("Error:", error);
        throw error;
      });
    console.log("response", response);
    return response;
  }

export async function getDogs(ids?: string[]): Promise<AxiosResponse<any>> {
  const response: AxiosResponse = await api
    .post("/dogs", ids)
    .catch((error) => {
      console.log("Error:", error);
      throw error;
    });
  return response;
}
