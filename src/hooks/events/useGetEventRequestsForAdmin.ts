import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

export interface EventRequest {
  eventType: string;
  clientName: string;
  phoneNumber: string;
  pickupDate: string;
  dropoffDate: string;
  pickupTime: string;
  location: string;
  addStops: string;
  hoursReserved: number;
  totalAmount: number;
  pendingAmount: number;
  equityDivision: number;
  imageUrl: string;
  name: string;
  slug: string;
  id: string;
  passengerCount: number;
  paymentStatus: string;
  depositAmount: number;
  vehicle: string;
  createdAt: string;
}

export interface EventRequestsResponse {
  message: string;
  data: {
    total: number;
    page: number;
    limit: number;
    requests: EventRequest[];
  };
}

export const useGetEventRequestsForAdmin = () => {
  return useQuery<EventRequestsResponse>({
    queryKey: ["event-requests"],
    queryFn: async () => {
      const res = await axios.get<EventRequestsResponse>(
        "/admin/event-requests"
      );
      return res.data;
    },
  });
};
