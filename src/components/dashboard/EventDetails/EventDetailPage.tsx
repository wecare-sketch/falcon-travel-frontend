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
  paidFor: number; // Added for head count
  equityAmount: number;
  depositedAmount: number;
  dueAmount: number;
  paymentStatus: "Paid" | "Pending" | "Overdue";
}
interface PaymentResponse {
  data: {
    sessionId: string;
  };
}

function getCurrentUserFromStorage() {
  if (typeof window === "undefined") return null;
  const id = localStorage.getItem("userId");
  const email = localStorage.getItem("userEmail");
  if (!id || !email) return null;
  return { id: String(id), email: String(email) };
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

  // State to track the current user's deposited amount for invoice availability
  const [userDepositedAmount, setUserDepositedAmount] = useState<number>(0);

  // State to track if the current user is the host of the event
  const [isCurrentUserHost, setIsCurrentUserHost] = useState<boolean>(false);

  // State to track if the current user paid for 1 headCount or more
  const [perHeadCount, setPerHeadCount] = useState(1);

  const [currentUser, setCurrentUser] = useState<{
    id: string;
    email: string;
  } | null>(null);

  const { event, isLoading, isError } = useEventDetailsByPageType(
    eventId,
    isUserRequestPage ?? false
  );

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }

    setCurrentUser(getCurrentUserFromStorage());
  }, []);

  // Calculate initial payable amount based on current user's due amount
  // Get user ID from localStorage and find their participant record
  useEffect(() => {
    if (!event || !("participants" in event) || !currentUser) return;

    // normalize host/email
    const eventHost = (event.host ?? "").toString().toLowerCase();
    const userEmail = currentUser.email.toLowerCase();
    const isHost = !!eventHost && userEmail === eventHost;
    setIsCurrentUserHost(isHost);

    // find the participant row for THIS user (normalize ids to strings)
    const participant = event.participants.find(
      (p) => String(p.user?.id ?? p.user.id ?? "") === currentUser.id
    );

    if (participant) {
      setUserDepositedAmount(participant.depositedAmount ?? 0);
    }

    if (isHost) {
      // host pays remaining
      setUserPayableAmount(event.pendingAmount ?? 0);
    } else if (participant) {
      const due = Math.max(
        0,
        (participant.equityAmount ?? 0) - (participant.depositedAmount ?? 0)
      );
      setUserPayableAmount(due);
    } else {
      // not found – either hide controls or default to 0
      setUserPayableAmount(0);
    }
  }, [event, currentUser]);

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

  // Handle Pay function - uses different endpoints for hosts vs regular users
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
      console.log("User is host:", isCurrentUserHost);
      toast.success(`Processing payment for $${userPayableAmount}`);

      // Use different endpoints based on user role:
      // For hosts: /user/payment/stripe/remaining/:event (pays for remaining amount)
      // For regular users: /user/payment/stripe/:event (pays custom amount)
      const endpoint = isCurrentUserHost
        ? `/user/payment/stripe/remaining/${event?.slug}`
        : `/user/payment/stripe/${event?.slug}`;

      console.log("Using payment endpoint:", endpoint);

      const response = await axiosInstance.post<PaymentResponse>(endpoint, {
        amount: userPayableAmount || event?.pendingAmount,
        paidFor: perHeadCount,
      });

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
          paidFor: participant.paidFor,
          phoneNumber: participant.user?.phoneNumber ?? "N/A",
          email: participant.email,
          equityAmount: participant.equityAmount,
          depositedAmount: participant.depositedAmount,
          dueAmount: Math.max(
            0,
            participant.equityAmount - participant.depositedAmount
          ),
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
        pickupLocation={formatValue(event?.pickupLocation)}
        dropOffLocation={formatValue(event?.dropOffLocation)}
        totalAmount={event?.totalAmount}
        pendingAmount={event?.pendingAmount}
        depositAmount={event?.depositAmount}
        userDepositedAmount={userDepositedAmount}
        isCurrentUserHost={isCurrentUserHost}
        eventSlug={event?.slug}
        onShareIt={handleShareIt}
        onPayNow={handlePay}
        onPerHeadChange={setPerHeadCount}
        handleCopyClick={handleCopyClick}
        currentPayableAmount={userPayableAmount ?? 0}
        onPayableAmountUpdate={setUserPayableAmount}
      />

      {!isUserRequestPage && "participants" in event && (
        <MembersTable members={membersData} />
      )}
    </>
  );
}
