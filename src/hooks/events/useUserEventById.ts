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
  name: string;
  imageUrl: string
}

const fetchEventById = async (eventId: string): Promise<EventType> => {
  const response = await axiosInstance.get<{ data: EventType }>("/user/events", {
    params: { eventId },
  });
  return response.data.data;
};

export const useUserEventById = (
  eventId: string | null,
  options?: { enabled?: boolean }
) => {
  return useQuery<EventType>({
    queryKey: ["user-event", eventId],
    queryFn: () => fetchEventById(eventId!),
    enabled: !!eventId && (options?.enabled ?? true),
  });
};
