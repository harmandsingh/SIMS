import { GetStudentsResponse } from "@/types/student";
import axios, { AxiosError } from "axios";
import authHeader from "./auth.header";
import { API_URL, logout } from "./auth.service";

export const getAllStudents = async () => {
  return await axios
    .get<GetStudentsResponse>(API_URL + "students", { headers: authHeader() })
    .then((response) => response.data.data)
    .catch((error: AxiosError) => {
      if (error.code === AxiosError.ERR_BAD_REQUEST) {
        logout();
      }
    });
};
