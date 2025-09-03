"use client";
import { loadStripe } from "@stripe/stripe-js";
import { PageHeader } from "../PageHeader";
import { EventInfoCard } from "./EventInfoCard";
import { MembersTable } from "./MembersTable";
import { useEventDetailsByPageType } from "@/hooks/events/useEventDetailsByPageType";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

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
interface PaymentResponse {
  data: {
    sessionId: string;
  };
}

export function EventDetailsPage({
  onBack,
  eventId,
  isUserRequestPage,
}: EventDetailsPageProps) {
  const router = useRouter();
  
  // State to track the payable amount entered by user in EventInfoCard
  // This amount is what the user specifically wants to pay, not the total pending amount
  const [userPayableAmount, setUserPayableAmount] = useState<number>(0);

  const { event, isLoading, isError } = useEventDetailsByPageType(
    eventId,
    isUserRequestPage ?? false
  );
  
  // Calculate initial payable amount when event data is available
  // This sets the default value that users can then modify in the EventInfoCard
  useEffect(() => {
    if (event?.totalAmount !== undefined && event?.pendingAmount !== undefined) {
      const calculatedPayableAmount = (event.totalAmount || 0) - (event.pendingAmount || 0);
      setUserPayableAmount(calculatedPayableAmount);
    }
  }, [event?.totalAmount, event?.pendingAmount]);

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

  const handleShareIt = () => {
    const eventSlug = event?.slug;
    console.log("event?.slug", eventSlug);
    if (eventSlug) {
      router.replace(`/shared/trip-details/${eventSlug}`);
    } else {
      console.error("Event slug is undefined or null");
    }
  };
 
  // Handle Pay function - uses the payable amount entered by user in EventInfoCard
  const handlePay = async () => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
    );
    if (!stripe) {
      console.error("Stripe failed to load.");
      return;
    }
    try {
      console.log("Sending payment request with amount:", userPayableAmount);
      toast.success(`Processing payment for $${userPayableAmount}`);
      
      // API endpoint updated to use /user/payment/stripe/:event format
      // Amount is now the user's entered payable amount instead of event's pending amount
      // This allows users to pay partial amounts as needed
      const response = await axiosInstance.post<PaymentResponse>(
        `/user/payment/stripe/${event?.slug}`,
        {
          amount: userPayableAmount || event?.pendingAmount,
        }
      );

      if (response.status !== 200) {
        console.error("Failed to create Stripe session");
        return;
      }
      const { sessionId } = response.data.data;
      console.log("response", response);
      console.log("sessionId", sessionId);
      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId, // Use session ID from backend
      });

      if (error) {
        console.error("Stripe checkout error:", error);
      }
    } catch (error) {
      console.error("Error creating Stripe session:", error);
    }
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

      {/* EventInfoCard now tracks user's payable amount input for payment processing */}
      {/* Users can enter the amount they want to pay, which will be sent to the payment API */}
      {/* Invoice download is now based on depositAmount > 0 instead of pendingAmount === 0 */}
      <EventInfoCard
        eventType={event?.eventType}
        vehicle={event?.vehicle}
        pickupDate={event?.pickupDate}
        phoneNumber={event?.phoneNumber}
        clientName={event?.clientName}
        location={formatValue(event?.location)}
        totalAmount={event?.totalAmount}
        pendingAmount={event?.pendingAmount}
        depositAmount={event?.depositAmount}
        eventSlug={event?.slug}
        onShareIt={handleShareIt}
        onPayNow={handlePay}
        handleCopyClick={handleCopyClick}
        onPayableAmountUpdate={setUserPayableAmount}
      />

      {!isUserRequestPage && "participants" in event && (
        <MembersTable members={membersData} />
      )}
    </>
  );
}