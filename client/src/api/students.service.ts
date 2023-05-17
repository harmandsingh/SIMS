import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./auth.service";
import { GetStudentsResponse } from "@/types/student";

export const getAllStudents = async () => {
  return await axios
    .get<GetStudentsResponse>(API_URL + "students", { headers: authHeader() })
    .then((response) => response.data.data);
};
