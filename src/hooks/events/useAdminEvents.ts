import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface Feedback {
  id: number;
  Q1: number;
  Q2: number;
  Q3: number;
  Q4: number;
  Q5: number;
  description: string;
  averageRating: number;
  createdAt: string;
}

interface EventType {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
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
  eventStatus: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  host: string;
  cohosts: string[];
  dropoffDate: string;
  pickupTime: string;
  addStops: string;
  feedbacks: Feedback[];
  tripNotes: string;
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

export const useAdminEvents = (options?: { enabled?: boolean }) => {
  return useQuery<ApiResponse>({
    queryKey: ["admin-events"],
    queryFn: fetchAdminEvents,
    enabled: options?.enabled ?? true,
  });
};
