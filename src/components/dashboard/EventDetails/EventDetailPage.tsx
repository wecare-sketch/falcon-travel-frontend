"use client";
import { loadStripe } from "@stripe/stripe-js";
import { PageHeader } from "../PageHeader";
import { EventInfoCard } from "./EventInfoCard";
import { MembersTable } from "./MembersTable";
import {
  useEventDetailsByPageType,
  Events,
  EventRequest,
} from "@/hooks/events/useEventDetailsByPageType";
import axiosInstance from "@/lib/axios";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

interface EventDetailsPageProps {
  onBack?: () => void;
  eventId?: string;
  isUserRequestPage?: boolean;
  justSignedUp?: boolean;
}

export interface Member {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  paidFor: number;
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

  console.log("Getting user from storage:", { id, email });

  if (!id || !email) {
    console.warn("User data incomplete in localStorage:", {
      hasId: !!id,
      hasEmail: !!email,
    });
    return null;
  }
  return { id: String(id), email: String(email) };
}

// Type guard to check if event is an Events type (has participants)
function isEventsType(
  event: Events | EventRequest | null | undefined
): event is Events {
  return event !== null && event !== undefined && "participants" in event;
}

export function EventDetailsPage({
  onBack,
  eventId,
  isUserRequestPage,
  justSignedUp = false,
}: EventDetailsPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [userPayableAmount, setUserPayableAmount] = useState<number>(0);
  const [userDepositedAmount, setUserDepositedAmount] = useState<number>(0);
  const [isCurrentUserHost, setIsCurrentUserHost] = useState<boolean>(false);
  const [perHeadCount, setPerHeadCount] = useState(1);
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    email: string;
  } | null>(null);

  const { event, isLoading, isError, refetch } = useEventDetailsByPageType(
    eventId,
    isUserRequestPage ?? false
  );

  // Initialize axios and current user
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

    const user = getCurrentUserFromStorage();
    setCurrentUser(user);

    if (user) {
      console.log("Current user loaded:", {
        id: user.id,
        email: user.email,
      });
    }
  }, []);

  // Check if user just signed up and refetch if needed
  useEffect(() => {
    const shouldRefresh =
      justSignedUp || searchParams?.get("justSignedUp") === "true";
    if (shouldRefresh && refetch) {
      console.log("User just signed up, refreshing event data...");
      const timer = setTimeout(() => {
        refetch();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [justSignedUp, searchParams, refetch]);

  // Calculate initial payable amount based on current user's due amount
  useEffect(() => {
    if (!event || !isEventsType(event) || !currentUser) {
      console.log("Missing data for calculation:", {
        hasEvent: !!event,
        hasParticipants: event && isEventsType(event),
        hasCurrentUser: !!currentUser,
      });
      return;
    }

    // Log all participants for debugging
    console.log(
      "All participants:",
      event.participants.map((p) => ({
        email: p.email || p.user?.email,
        userId: p.user?.id,
        equityAmount: p.equityAmount,
        depositedAmount: p.depositedAmount,
      }))
    );

    // Normalize host/email
    const eventHost = (event.host ?? "").toString().toLowerCase();
    const userEmail = currentUser.email.toLowerCase();
    const isHost = !!eventHost && userEmail === eventHost;
    setIsCurrentUserHost(isHost);

    // Find participant by email (more reliable than ID)
    const participant = event.participants.find((p) => {
      const participantEmail = (p.email || p.user?.email || "")
        .toLowerCase()
        .trim();

      const matches = participantEmail === userEmail.toLowerCase().trim();

      if (matches) {
        console.log("Found matching participant by email:", {
          participantEmail,
          userEmail,
          data: {
            equityAmount: p.equityAmount,
            depositedAmount: p.depositedAmount,
          },
        });
      }

      return matches;
    });

    if (participant) {
      console.log("Found participant for current user:", {
        email: participant.email || participant.user?.email,
        equityAmount: participant.equityAmount,
        depositedAmount: participant.depositedAmount,
        calculatedDue:
          (participant.equityAmount ?? 0) - (participant.depositedAmount ?? 0),
      });

      setUserDepositedAmount(participant.depositedAmount ?? 0);

      const due = Math.max(
        0,
        (participant.equityAmount ?? 0) - (participant.depositedAmount ?? 0)
      );

      if (!isHost) {
        setUserPayableAmount(due);
        console.log("Set user payable amount to:", due);
      }
    } else {
      console.warn("No participant found for current user email:", userEmail);
      console.warn(
        "Available participant emails:",
        event.participants.map((p) => p.email || p.user?.email)
      );
      setUserDepositedAmount(0);

      if (!isHost && refetch) {
        console.log("Participant not found, attempting refetch...");
        setTimeout(() => {
          refetch();
        }, 1000);
      }
    }

    if (isHost) {
      setUserPayableAmount(event.pendingAmount ?? 0);
      console.log(
        "User is host, set payable amount to pending:",
        event.pendingAmount
      );
    }
  }, [event, currentUser, refetch]);

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
      console.log("Per head count:", perHeadCount);

      toast.success(`Processing payment for $${userPayableAmount}`);

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

      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error("Stripe checkout error:", error);
      }
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      toast.error("Failed to process payment");
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

  const handleManualRefresh = async () => {
    if (refetch) {
      toast.loading("Refreshing event data...");
      refetch();
      setTimeout(() => {
        toast.dismiss();
        toast.success("Event data refreshed!");
      }, 1500);
    }
  };

  const membersData: Member[] | undefined =
    !isUserRequestPage && isEventsType(event)
      ? event.participants.map((participant) => ({
          id: participant.id.toString(),
          name: participant.user?.fullName ?? "Unknown",
          paidFor: participant.paidFor,
          phoneNumber: participant.user?.phoneNumber ?? "N/A",
          email: participant.email || participant.user?.email || "N/A",
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
      <PageHeader
        title="Event Details"
        onBack={onBack}
        onRefresh={handleManualRefresh}
      />

      <EventInfoCard
        eventType={event.eventType}
        vehicle={"vehicle" in event ? event.vehicle : undefined}
        pickupDate={event.pickupDate}
        phoneNumber={event.phoneNumber}
        clientName={event.clientName}
        pickupLocation={formatValue(event.pickupLocation)}
        dropOffLocation={formatValue(event.dropOffLocation)}
        totalAmount={event.totalAmount}
        pendingAmount={event.pendingAmount}
        depositAmount={event.depositAmount}
        userDepositedAmount={userDepositedAmount}
        isCurrentUserHost={isCurrentUserHost}
        eventSlug={event.slug}
        onShareIt={handleShareIt}
        onPayNow={handlePay}
        onPerHeadChange={setPerHeadCount}
        handleCopyClick={handleCopyClick}
        currentPayableAmount={userPayableAmount ?? 0}
        onPayableAmountUpdate={setUserPayableAmount}
      />

      {!isUserRequestPage && isEventsType(event) && (
        <MembersTable members={membersData} />
      )}
    </>
  );
}
