import axios, { AxiosError } from "axios";
import { API_URL, logout } from "./auth.service";
import authHeader from "./auth.header";
import { AddTeacherResponse, GetTeachersResponse } from "@/types/teacher";
import { AddTeacherFormInputs } from "@/components/AddTeacherModal";

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

export const addTeacher = async ({
  name,
  email,
  dob,
  teachingCourses,
  teachingClasses,
}: AddTeacherFormInputs) => {
  const response = await axios.post<AddTeacherResponse>(API_URL + "teachers", {
    name,
    email,
    dob,
    teachingCourses,
    teachingClasses,
  });

  return response.data.result;
};
