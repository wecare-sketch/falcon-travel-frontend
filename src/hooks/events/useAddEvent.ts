import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface CreateEventPayload {
  eventDetails: {
    eventType: string;
    clientName: string;
    phoneNumber: string;
    pickupDate: string;
    dropOffDate: string;
    pickupTime: string;
    location: string;
    stops: string[];
  };
  vehicleInfo: {
    vehicleName: string;
    numberOfPassengers: number;
    hoursReserved: number;
  };
  paymentDetails: {
    totalAmount: number;
    depositAmount: number;
    pendingAmount: number;
    equityDivision: number;
  };
}

// ✅ Matches your API response structure
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
  return useMutation<CreateEventResponse, Error, CreateEventPayload>({
    mutationFn: async (data: CreateEventPayload) => {
      const response = await axios.post<CreateEventResponse>("/admin/event/add", data);
      return response.data;
    },
  });
};
