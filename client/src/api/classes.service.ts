import { GetClassesResponse } from "@/types/class";
import axios, { AxiosError } from "axios";
import authHeader from "./auth.header";
import { API_URL, logout } from "./auth.service";

export const getAllClasses = async () => {
  return await axios
    .get<GetClassesResponse>(API_URL + "classes", { headers: authHeader() })
    .then((response) => response.data.data)
    .catch((error: AxiosError) => {
      if (error.code === AxiosError.ERR_BAD_REQUEST) {
        logout();
      }
    });
};
