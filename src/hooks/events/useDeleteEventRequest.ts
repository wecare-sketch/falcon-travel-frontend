import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface DeleteEventRequestResponse {
  message: string;
}

export const useDeleteEventRequest = () => {
  return useMutation<DeleteEventRequestResponse, Error, string>({
    mutationFn: async (slug: string) => {
      const response = await axios.delete<DeleteEventRequestResponse>(
        `/admin/request/${slug}/delete`
      );
      return response.data;
    },
  });
};
