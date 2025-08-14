import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface PersonalDetailsPayload {
  fullName: string;
  phone: string;
}

export const useUpdateUserDetails = () => {
  return useMutation({
    mutationFn: async (payload: PersonalDetailsPayload) => {
      const res = await axios.post("/user/userdetails", payload);
      return res.data;
    },
  });
};
