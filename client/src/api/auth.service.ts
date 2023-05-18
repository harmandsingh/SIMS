import { LoginFormInputs } from "@/scenes/auth/login";
import { LoginResponse } from "@/types/user";
import axios from "axios";

export const API_URL = "http://localhost:4000/api/v1/";

export var tokenStr = "";

export const login = async ({ email, password }: LoginFormInputs) => {
  const response = await axios.post<LoginResponse>(API_URL + "users/login", {
    email,
    password,
  });
  if (response.data.token && response.data.user.username) {
    localStorage.setItem("user", response.data.token);
    localStorage.setItem("username", response.data.user.username);
  }
  return response.data.user;
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("username");
};
