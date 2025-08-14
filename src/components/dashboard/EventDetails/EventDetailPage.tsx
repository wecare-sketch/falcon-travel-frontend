"use client";

import { PageHeader } from "../PageHeader";
import { EventInfoCard } from "./EventInfoCard";
import { MembersTable } from "./MembersTable";
import { useEventDetailsByPageType } from "@/hooks/events/useEventDetailsByPageType";

interface EventDetailsPageProps {
  onBack?: () => void;
  eventId?: string;
  isUserRequestPage?: boolean;
}

export interface Member {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  dueAmount: number;
  paymentStatus: "Paid" | "Pending" | "Overdue";
}

export function EventDetailsPage({
  onBack,
  eventId,
  isUserRequestPage,
}: EventDetailsPageProps) {
  const { event, isLoading, isError } = useEventDetailsByPageType(
    eventId,
    isUserRequestPage ?? false
  );


  if (isLoading) {
    return <div className="text-center mt-6">Loading event...</div>;
  }

  if (isError || !event) {
    return (
      <div className="text-center mt-6 text-red-500">Failed to load event.</div>
    );
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

  const membersData: Member[] | undefined =
    !isUserRequestPage && "participants" in event
      ? event.participants.map((participant) => ({
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
        }))
      : undefined;

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

      {!isUserRequestPage && "participants" in event && (
        <MembersTable members={membersData} />
      )}
    </>
  );
}
