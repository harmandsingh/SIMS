import axios from "axios";
import { API_URL } from "./auth.service";
import authHeader from "./auth-header";
import { GetTeachersResponse } from "@/types/teacher";

export const getAllTeachers = async () => {
  return await axios
    .get<GetTeachersResponse>(API_URL + "students", { headers: authHeader() })
    .then((response) => response.data.data);
};
