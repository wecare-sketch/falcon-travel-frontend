import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface SignupPayload {
  email: string;
  password: string;
}

const signupUser = async (payload: SignupPayload) => {
  const response = await axios.post("/auth/register", payload);
  return response.data;
};

export const useSignup = () => {
  return useMutation({ mutationFn: signupUser });
};
