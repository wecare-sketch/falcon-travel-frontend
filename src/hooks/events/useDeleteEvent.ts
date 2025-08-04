import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface DeleteEventResponse {
  message: string;
}

export const useDeleteEvent = () => {
  return useMutation<DeleteEventResponse, Error, string>({
    mutationFn: async (slug: string) => {
      const response = await axios.delete<DeleteEventResponse>(
        `/admin/event/${slug}/delete`
      );
      return response.data;
    },
  });
};
