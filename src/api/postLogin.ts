import { LoginResponse } from "./../types/auth";
import { BaseUser } from "@/types/auth";
import axios from "axios";

const postLogin = async (data: BaseUser): Promise<LoginResponse> => {
  const response = await axios.post("/api/auth/signin", data, {
    withCredentials: true,
  });
  return response.data;
};
export default postLogin
