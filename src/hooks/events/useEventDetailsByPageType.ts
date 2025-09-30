import { useGetEventRequestById } from "./useGetEventRequestById";
import { useGetEventByIdByRole } from "./useGetEventByIdByRole";

type PaymentStatus = "paid" | "pending";
type UserRole = "host" | "cohost" | "guest";

interface EventUser {
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

interface EventParticipant {
  id: number;
  email: string;
  equityAmount: number;
  paidFor: number;
  depositedAmount: number;
  paymentStatus: PaymentStatus;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  user: EventUser;
}

interface Events {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
  eventType: string;
  clientName: string;
  phoneNumber: string;
  pickupDate: string;
  // location: string;
  pickupLocation: string;
  dropOffLocation: string;
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
}

interface EventData {
  event: Events;
}

export const useEventDetailsByPageType = (
  eventId: string | undefined,
  isUserRequestPage: boolean
) => {
  const stringEventId = eventId?.toString() ?? "";

  const userRequest = useGetEventRequestById(stringEventId, {
    enabled: isUserRequestPage && !!stringEventId,
  });

  const adminEvent = useGetEventByIdByRole(stringEventId, {
    enabled: !isUserRequestPage && !!stringEventId,
  }) as {
    data: EventData | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  if (isUserRequestPage) {
    return {
      event: userRequest.data,
      isLoading: userRequest.isLoading,
      isError: userRequest.isError,
    };
  }

  return {
    event: adminEvent.data?.event,
    isLoading: adminEvent.isLoading,
    isError: adminEvent.isError,
  };
};
