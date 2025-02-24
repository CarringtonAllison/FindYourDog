import { AxiosResponse } from "axios";
import api from "./configs/axiosConfig";

type AuthValues = {
  name: string;
  email: string;
};

export default async function Auth(values: AuthValues): Promise<AxiosResponse> {
  const response = await api
    .post("/auth/login", {
      name: values.name,
      email: values.email,
    })
    .catch((error) => {
      console.log("Error:", error);
      throw error;
    });

  return response;
}
