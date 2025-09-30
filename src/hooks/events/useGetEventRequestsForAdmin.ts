import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export interface EventRequest {
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
  tripNotes: string;
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
  const role = useSelector((state: RootState) => state.userRole.role);
  return useQuery<EventRequestsResponse>({
    queryKey: ["event-requests"],
    queryFn: async () => {
      const res = await axios.get<EventRequestsResponse>(
        "/admin/event-requests"
      );
      return res.data;
    },
    enabled: role === "admin",
  });
};
