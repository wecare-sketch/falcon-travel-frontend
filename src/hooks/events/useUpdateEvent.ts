import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface UpdateEventResponse {
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

export const useUpdateEvent = () => {
  return useMutation<
    UpdateEventResponse,
    Error,
    { slug: string; formData: FormData }
  >({
    mutationFn: async ({ slug, formData }) => {
      const response = await axios.patch<UpdateEventResponse>(
        `/admin/event/${slug}/edit`,
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
