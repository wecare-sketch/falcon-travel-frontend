import { useState } from "react";
import { PageHeader } from "../PageHeader";
import { SearchFilters } from "../SearchFilter";
import { EventCard } from "../UpcomingEvents/EventCard";
import AddFeedback from "./AddFeedback";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { FeedbackDetailsPage } from "./FeedbackDetailsPage";
import { useGetEventByIdByRole } from "@/hooks/events/useGetEventByIdByRole";
import { useEventsByRole } from "@/hooks/events/useEventsByRole";

interface Feedback {
  id: number;
  Q1: number;
  Q2: number;
  Q3: number;
  Q4: number;
  Q5: number;
  description: string;
  averageRating: number;
  createdAt: string;
}

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
  feedbacks: Feedback[];
}

export function FeedBackPage() {
  const [selectedEventSlug, setSelectedEventSlug] = useState<string | null>(
    null
  );
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const { data } = useGetEventByIdByRole(selectedEventId);

  const role = useSelector((state: RootState) => state.userRole.role);
  const { data: eventsData, isLoading, isError } = useEventsByRole();

  const events = eventsData?.events;

  const handleViewDetails = (event: Event) => {
    setSelectedEventSlug(event.slug);
    setSelectedEventId(event.id);
  };

  if (role === "user") {
    if (selectedEventSlug !== null) {
      return <AddFeedback eventId={selectedEventSlug} />;
    }
  } else {
    if (selectedEventSlug !== null) {
      return <FeedbackDetailsPage event={data?.event} />;
    }
  }

  return (
    <>
      <PageHeader title="Add Event FeedBack" />
      <SearchFilters />
      {/* Loading State */}
      {isLoading && (
        <div className="mt-8 text-center text-blue-600 font-semibold">
          Loading events...
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="mt-8 text-center text-red-500 font-semibold">
          Failed to load events. Please try again later.
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && events?.length === 0 && (
        <div className="mt-8 text-center text-gray-500">
          No events available for feedback.
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events?.map((event) => (
          <EventCard
            key={event.id}
            title={event.name}
            date={event.pickupDate}
            imageUrl={event.imageUrl}
            averageRating={event?.feedbacks?.[0]?.averageRating}
            createdAt={event?.feedbacks?.[0]?.createdAt}
            onViewDetails={() => handleViewDetails(event)}
            Label={role === "user" ? "Add Your Feedback" : "View Details"}
          />
        ))}
      </div>
    </>
  );
}
