"use client";
import { PageHeader } from "../PageHeader";
import { EventInfoCard } from "./EventInfoCard";
import { MembersTable } from "./MembersTable";
import { useEventDetailsByPageType } from "@/hooks/events/useEventDetailsByPageType";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CustomPaymentModal } from "./CustomPaymentModal";
import { useState } from "react";

interface EventDetailsPageProps {
  onBack?: () => void;
  eventId?: string;
  isUserRequestPage?: boolean;
  role?: "admin" | "user" | null;
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
  role,
}: EventDetailsPageProps) {
  const router = useRouter();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { event, isLoading, isError } = useEventDetailsByPageType(
    eventId,
    isUserRequestPage ?? false,
    role
  );

  const formatValue = (value: unknown): string => {
    if (value == null) return "";
    if (typeof value === "string" || typeof value === "number")
      return String(value);
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
    const eventSlug = event?.slug;
    console.log("event?.slug", eventSlug);
    if (eventSlug) {
      router.replace(`/shared/trip-details/${eventSlug}`);
    } else {
      console.error("Event slug is undefined or null");
    }
  };
 
  // Handle Pay function
  const handlePay = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    // Refresh event data or show success message
    toast.success("Payment completed successfully!");
    // You can add logic here to refresh the event data
  };

  const handleCopyClick = () => {
    const eventSlug = event?.slug;
    const url = `${window.location.origin}/shared/trip-details/${eventSlug}`;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("URL copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
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
        location={formatValue(event?.location)}
        totalAmount={event?.totalAmount}
        pendingAmount={event?.pendingAmount}
        onDownloadInvoice={handleDownloadInvoice}
        onShareIt={handleShareIt}
        onPayNow={handlePay}
        handleCopyClick={handleCopyClick}
      />

      {!isUserRequestPage && "participants" in event && (
        <MembersTable members={membersData} />
      )}

      {/* Custom Payment Modal */}
      <CustomPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={event?.pendingAmount || 0}
        eventSlug={event?.slug || ""}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
}
