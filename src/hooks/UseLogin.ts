import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await axios.post("/api/auth/login", credentials);
      return response.data;
    }
  });
};