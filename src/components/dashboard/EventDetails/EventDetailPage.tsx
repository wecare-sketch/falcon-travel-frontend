"use client";

import { PageHeader } from "../PageHeader";
import { EventInfoCard } from "./EventInfoCard";
import { MembersTable } from "./MembersTable";
import { ShareItineraryPage } from "./ShareItineraryPage";
import { useEventDetailsByPageType } from "@/hooks/events/useEventDetailsByPageType";
import { useState } from "react";

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
  const [showShareItinerary, setShowShareItinerary] = useState(false);
  const { event, isLoading, isError } = useEventDetailsByPageType(
    eventId,
    isUserRequestPage ?? false
  );

  const formatValue = (value: unknown): string => {
    if (value == null) return "";
    if (typeof value === "string" || typeof value === "number") return String(value);
    if (typeof value === "object") {
      const obj = value as Record<string, unknown>;
      const candidate =
        (obj.address as string) ||
        (obj.city as string) ||
        (obj.name as string) ||
        (obj.label as string);
      if (candidate) return candidate;
      try {
        return JSON.stringify(obj);
      } catch {
        return "";
      }
    }
    return "";
  };


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
    console.log("handleShareIt");
    setShowShareItinerary(true);
  };

  const handleBackFromShare = () => {
    setShowShareItinerary(false);
  };

  const handlePay = () => {
    console.log("Pay Now");
  };

  if (showShareItinerary) {
    return <ShareItineraryPage eventSlug={event?.slug || ""} onBack={handleBackFromShare} />;
  }

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
        location={formatValue(event?.location)}
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
