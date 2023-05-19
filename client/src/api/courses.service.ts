import axios from "axios";
import { API_URL } from "./auth.service";
import authHeader from "./auth.header";
import { AddCourseResponse, GetCoursesResponse } from "@/types/course";
import { AddCourseFormInputs } from "@/components/AddCourseModal";

export const getAllCourses = async () => {
  return await axios
    .get<GetCoursesResponse>(API_URL + "courses", { headers: authHeader() })
    .then((response) => response.data.data);
};

export const addCourse = async ({
  
  name,
  description
}: AddCourseFormInputs) => {
  const response = await axios.post<AddCourseResponse>(API_URL + "courses",  {

  name,
  description
  }, { headers: authHeader() });

  return response.data.result;
};