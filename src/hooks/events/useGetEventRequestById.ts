import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface EventRequest {
  eventType: string;
  clientName: string;
  phoneNumber: string;
  pickupDate: string;
  dropoffDate: string;
  pickupTime: string;
  location: string;
  addStops: string;
  pickupLocation: string;
  dropOffLocation: string;
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

interface EventRequestsResponse {
  message: string;
  data: {
    total: number;
    page: number;
    limit: number;
    request: EventRequest;
  };
}

export const useGetEventRequestById = (
  requestId: string | null,
  options?: { enabled?: boolean }
) => {
  return useQuery<EventRequest | null>({
    queryKey: ["event-request", requestId],
    queryFn: async () => {
      if (!requestId) return null;

      const res = await axios.get<EventRequestsResponse>(
        `/admin/event-requests?requestId=${requestId}`
      );

      const request = res.data?.data?.request;
      console.log("request", request);
      return request ?? null;
    },
    enabled: options?.enabled ?? !!requestId,
  });
};
