import { useState } from "react";
import { PageHeader } from "../PageHeader";
import { SearchFilters } from "../SearchFilter";
import { EventCard } from "../UpcomingEvents/EventCard";
import AddFeedback from "./AddFeedback";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { FeedbackDetailsPage } from "./FeedbackDetailsPage";
import { useGetEventByIdByRole } from "@/hooks/events/useGetEventByIdByRole";

interface Event {
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
}

export function FeedBackPage() {
  const [selectedEventSlug, setSelectedEventSlug] = useState<string | null>(
    null
  );
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const { data } = useGetEventByIdByRole(selectedEventId);

  const role = useSelector((state: RootState) => state.userRole.role);
  const eventsState = useSelector((state: RootState) => state.events);
  const events = eventsState.events;
  const isFeedbackSubmitted = data?.event.feedbacks.length;
  const handleViewDetails = (event: Event) => {
    setSelectedEventSlug(event.slug);
    setSelectedEventId(event.id);
  };

  if (role === "user") {
    if (selectedEventSlug !== null && isFeedbackSubmitted === 0) {
      return <AddFeedback eventId={selectedEventSlug} />;
    }
    if (selectedEventSlug !== null && isFeedbackSubmitted !== 0) {
      return <FeedbackDetailsPage event={data?.event} />;
    }
  } else {
    if (selectedEventSlug !== null && isFeedbackSubmitted !== 0) {
      return <FeedbackDetailsPage event={data?.event} />;
    }
  }

  return (
    <>
      <PageHeader title="Add Event FeedBack" />
      <SearchFilters />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.name}
            date={event.pickupDate}
            imageUrl={event.imageUrl}
            // rating={event.rating}
            // totalReviews={event.totalReviews}
            // lastReviewDate={event.lastReviewDate}
            onViewDetails={() => handleViewDetails(event)}
            Label={role === "user" ? "Add Your Feedback" : "View Details"}
          />
        ))}
      </div>
    </>
  );
}
