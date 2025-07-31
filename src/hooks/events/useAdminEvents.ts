import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface EventType {
  id: number;
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
  status: string;
  createdAt: string;
  updatedAt: string;
  host: string;
  cohosts: string;
  participants: unknown[]; 
}

interface ApiResponse {
  total: number;
  page: number;
  limit: number;
  events: EventType[];
}

interface ApiWrapper {
  data: ApiResponse;
}

const fetchAdminEvents = async (): Promise<ApiResponse> => {
  const response = await axiosInstance.get<ApiWrapper>("/admin/events");
  return response.data.data;
};

export const useAdminEvents = () => {
  return useQuery<ApiResponse>({
    queryKey: ["admin-events"],
    queryFn: fetchAdminEvents,
  });
};