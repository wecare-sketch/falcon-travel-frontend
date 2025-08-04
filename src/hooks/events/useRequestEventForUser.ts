import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface RequestEventResponse {
  message: string;
  data: {
    slug: string;
    eventType: string;
    clientName: string;
    phoneNumber: string;
    pickupDate: string;
    location: string;
    vehicle: string;
    totalAmount: number;
    passengerCount: number;
    hoursReserved: number;
    host: string | null;
    cohosts: string | null;
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const useRequestEventForUser = () => {
  return useMutation<RequestEventResponse, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post<RequestEventResponse>(
        "/user/request-event",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
  });
};
