import { SignupRequest } from "@/types/auth";
import axios from "axios";

const url = "/api/auth/signup";

const getSignup = async (data: SignupRequest): Promise<void> => {
  await axios.post(url, data, {
    withCredentials: true,
  });
};

export default getSignup;
