import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface UpdateEventRequestResponse {
  message: string;
  data: {
    id: string;
    slug: string;
    name: string;
    eventType: string;
    clientName: string;
    phoneNumber: string;
    pickupDate: string;
    location: string;
    vehicle: string;
    hoursReserved: number;
    passengerCount: number;
    totalAmount: number | null;
    pendingAmount: number | null;
    depositAmount: number | null;
    equityDivision: number | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    host: string;
    cohosts: string[];
    imageUrl: string;
    participants: (string | null)[];
  };
}


export const useUpdateEventRequest = () => {
  return useMutation<
    UpdateEventRequestResponse,
    Error,
    { slug: string; formData: FormData }
  >({
    mutationFn: async ({ slug, formData }) => {
      const response = await axios.patch<UpdateEventRequestResponse>(
        `/admin/request/${slug}/edit`,
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
