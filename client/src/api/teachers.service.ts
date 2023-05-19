import axios, { AxiosError } from "axios";
import { API_URL, logout } from "./auth.service";
import authHeader from "./auth.header";
import { GetTeachersResponse } from "@/types/teacher";

export const getAllTeachers = async () => {
  return await axios
    .get<GetTeachersResponse>(API_URL + "teachers", { headers: authHeader() })
    .then((response) => response.data.data)
    .catch((error: AxiosError) => {
      if (error.code === AxiosError.ERR_BAD_REQUEST) {
        logout();
      }
    });
};
