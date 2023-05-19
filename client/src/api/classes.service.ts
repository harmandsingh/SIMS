import { GetClassesResponse } from "@/types/class";
import axios from "axios";
import authHeader from "./auth.header";
import { API_URL } from "./auth.service";

export const getAllClasses = async () => {
  return await axios
    .get<GetClassesResponse>(API_URL + "classes", { headers: authHeader() })
    .then((response) => response.data.data);
};
