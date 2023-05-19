import axios from "axios";
import { API_URL } from "./auth.service";
import authHeader from "./auth.header";
import { GetCoursesResponse } from "@/types/course";

export const getAllCourses = async () => {
  return await axios
    .get<GetCoursesResponse>(API_URL + "courses", { headers: authHeader() })
    .then((response) => response.data.data);
};
