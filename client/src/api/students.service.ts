import { AddStudentFormInputs } from "@/components/AddStudentModal";
import { AddStudentResponse, GetStudentsResponse } from "@/types/student";
import axios, { AxiosError } from "axios";
import authHeader from "./auth.header";
import { API_URL, logout } from "./auth.service";

export const getAllStudents = async () => {
  return await axios
    .get<GetStudentsResponse>(API_URL + "students", { headers: authHeader() })
    .then((response) => response.data.data)
    .catch((error: AxiosError) => {
      console.log(error);
      if (error.code === AxiosError.ERR_BAD_REQUEST) {
        logout();
      }
    });
};

export const addStudent = async ({
  name,
  fatherName,
  motherName,
  phoneNumber,
  dob,
  gender,
  streetAddress,
  city,
  state,
  country,
}: AddStudentFormInputs) => {
  return await axios
    .post<AddStudentResponse>(
      API_URL + "students",
      {
        name,
        fatherName,
        motherName,
        phoneNumber,
        dob,
        gender,
        streetAddress,
        city,
        state,
        country,
      },
      { headers: authHeader() }
    )
    .then((response) => response.data.result)
    .catch((error: AxiosError) => {
      if (error.code === AxiosError.ERR_BAD_REQUEST) {
        logout();
      }
    });
};
