import axios, { AxiosError } from "axios";
import authHeader from "./auth.header";
import { API_URL, logout } from "./auth.service";
import { AddStudentResponse, GetStudentsResponse } from "@/types/student";
import { AddStudentFormInputs } from "@/components/AddStudentModal";


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

export const addStudent = async ({
  name,
  fatherName,
  motherName,
  phoneNumber,
  dob,
  streetAddress,
  city,
  state, 
  country,
}: AddStudentFormInputs) => {
  const response = await axios.post<AddStudentResponse>(API_URL + "students",  {
  name,
  fatherName,
  motherName,
  phoneNumber,
  dob,
  streetAddress,
  city,
  state, 
  country,
  }, { headers: authHeader() });

  return response.data.result;
};