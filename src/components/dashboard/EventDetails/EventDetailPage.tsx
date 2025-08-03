"use client";

import { PageHeader } from "../PageHeader";
import { EventInfoCard } from "./EventInfoCard";
import { MembersTable } from "./MembersTable";
import { useGetEventByIdByRole } from "@/hooks/events/useGetEventByIdByRole";

interface EventDetailsPageProps {
  onBack?: () => void;
  eventId?: string;
}

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
}

interface EventData {
  event: Events;
}
export function EventDetailsPage({ onBack, eventId }: EventDetailsPageProps) {
  const stringEventId = eventId?.toString() ?? null;
  const { data: eventData } = useGetEventByIdByRole(stringEventId) as {
    data: EventData | undefined;
  };

  const event = eventData?.event;

  if (!eventData) {
    return <div>Event not found.</div>;
  }

  const handleDownloadInvoice = () => {
    console.log("Download invoice");
  };

  const handleShareIt = () => {
    console.log("Share it");
  };

  const handlePay = () => {
    console.log("Pay Now");
  };

  const membersData = eventData.event.participants.map((participant) => ({
    id: participant.id.toString(),
    name: participant.user?.fullName ?? "Unknown",
    phoneNumber: participant.user?.phoneNumber ?? "N/A",
    email: participant.email,
    dueAmount: participant.equityAmount - participant.depositedAmount,
    userStatus: participant.role === "host" ? "Host" : "Co-Host",
    paymentStatus: (participant.paymentStatus === "paid"
      ? "Paid"
      : participant.paymentStatus === "pending"
      ? "Pending"
      : "Overdue") as "Paid" | "Pending" | "Overdue",
  }));

  return (
    <>
      <PageHeader title="Event Details" onBack={onBack} />

      <EventInfoCard
        eventType={event?.eventType}
        vehicle={event?.vehicle}
        pickupDate={event?.pickupDate}
        phoneNumber={event?.phoneNumber}
        clientName={event?.clientName}
        location={event?.location}
        totalAmount={event?.totalAmount}
        pendingAmount={event?.pendingAmount}
        onDownloadInvoice={handleDownloadInvoice}
        onShareIt={handleShareIt}
        onPayNow={handlePay}
      />

      <MembersTable members={membersData} />
    </>
  );
}
