import { AxiosResponse } from "axios";
import api from "./configs/axiosConfig";

export async function getMatch(favorites: string[]): Promise<AxiosResponse<any>> {
    const response: AxiosResponse = await api
      .post("/dogs/match", favorites)
      .catch((error) => {
        console.log("Error:", error);
        throw error;
      });
    return response;
  }
  