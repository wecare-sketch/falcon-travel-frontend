import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface Feedback {
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

export interface EventUser {
  id: string;
  fullName: string;
  phoneNumber: string;
  dateOfBirth: string;
  email: string;
  password: string;
  role: "user";
  createdAt: string;
  updatedAt: string;
  appleSubId: string | null;
}

export interface EventParticipant {
  id: number;
  email: string;
  equityAmount: number;
  depositedAmount: number;
  paymentStatus: "paid" | "pending";
  role: "host" | "cohost" | "guest";
  createdAt: string;
  updatedAt: string;
  user: EventUser;
}

export interface Event {
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
  participants: EventParticipant[];
  feedbacks: Feedback[];
  media: unknown[];
  messages: unknown[];
  transactions: unknown[];
}

export interface EventResponse {
  message: string;
  data: {
    event: Event;
  };
}

const fetchAdminEventById = async (
  eventId: string
): Promise<EventResponse["data"]> => {
  const response = await axiosInstance.get<EventResponse>(`/admin/events`, {
    params: { eventId },
  });
  return response.data.data;
};

export const useAdminEventById = (
  eventId: string | null,
  options?: { enabled?: boolean }
) => {
  return useQuery<EventResponse["data"]>({
    queryKey: ["admin-event", eventId],
    queryFn: () => fetchAdminEventById(eventId!),
    enabled: !!eventId && (options?.enabled ?? true),
  });
};
