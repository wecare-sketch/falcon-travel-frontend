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

export interface Events {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
  eventType: string;
  clientName: string;
  phoneNumber: string;
  pickupDate: string;
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

export interface EventRequest {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
  eventType: string;
  clientName: string;
  phoneNumber: string;
  pickupDate: string;
  pickupLocation: string;
  dropOffLocation: string;
  vehicle: string;
  totalAmount: number;
  pendingAmount: number;
  depositAmount: number;
  passengerCount: number;
  paymentStatus: string;
  createdAt: string;
}

// Union type for event that could be either type
export type EventType = Events | EventRequest;

interface EventDetailsReturn {
  event: EventType | null | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export const useEventDetailsByPageType = (
  eventId: string | undefined,
  isUserRequestPage: boolean
): EventDetailsReturn => {
  const stringEventId = eventId?.toString() ?? "";

  const userRequest = useGetEventRequestById(stringEventId, {
    enabled: isUserRequestPage && !!stringEventId,
  });

  const adminEventResult = useGetEventByIdByRole(stringEventId, {
    enabled: !isUserRequestPage && !!stringEventId,
  });

  if (isUserRequestPage) {
    return {
      event: userRequest.data as EventRequest | null | undefined,
      isLoading: userRequest.isLoading,
      isError: userRequest.isError,
      refetch: userRequest.refetch || (() => {}),
    };
  }

  // Check if adminEventResult has refetch (it should if it's from React Query)
  const hasRefetch = adminEventResult && "refetch" in adminEventResult;

  // Type guard to check if the result has event data
  const hasEventData = (data: unknown): data is EventData => {
    return (
      data !== null &&
      data !== undefined &&
      typeof data === "object" &&
      "event" in data
    );
  };

  const eventData = hasEventData(adminEventResult.data)
    ? adminEventResult.data.event
    : (adminEventResult.data as Events | null | undefined);

  return {
    event: eventData,
    isLoading: adminEventResult.isLoading,
    isError: adminEventResult.isError,
    refetch: hasRefetch ? adminEventResult.refetch : () => {},
  };
};
