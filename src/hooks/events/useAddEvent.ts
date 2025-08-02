import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
interface CreateEventResponse {
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
    pendingAmount: number;
    depositAmount: number;
    hoursReserved: number;
    equityDivision: number;
    host: string | null;
    cohosts: string | null;
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const useAddEvent = () => {
  return useMutation<CreateEventResponse, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post<CreateEventResponse>(
        "/admin/event/add",
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
