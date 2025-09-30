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
import axiosInstance from "@/lib/axios";

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
interface EventResponse {
  data: {
    events: Event[];
  };
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
  feedbacks: Feedback[];
}
interface FeedBackPageProps {
  setActiveView: (view: string) => void;
}
interface SearchParams {
  search: string;
  host?: string;
  paymentStatus?: string;
}

export function FeedBackPage({ setActiveView }: FeedBackPageProps) {
  const [selectedEventSlug, setSelectedEventSlug] = useState<string | null>(
    null
  );
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const { data } = useGetEventByIdByRole(selectedEventId);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const role = useSelector((state: RootState) => state.userRole.role);
  const { data: eventsData, isLoading, isError } = useEventsByRole();
  const events = eventsData?.events;
  const handleSearch = async (query: string, host: string, status: string) => {
    setHasSearched(true);
    try {
      const params: SearchParams = {
        search: query,
      };

      if (host !== "allHost") {
        params.host = host;
      }

      if (status !== "allStatus") {
        params.paymentStatus = status;
      }
      let endpoint = "";
      if (role === "admin") {
        endpoint = "/admin/events";
      } else if (role === "user") {
        endpoint = "/user/events";
      } else {
        console.error("Invalid role");
        return;
      }
      const response = await axiosInstance.get<EventResponse>(endpoint, {
        params,
      });

      if (response?.data?.data?.events) {
        const mappedFilteredEvents = response.data.data.events.map((event) => ({
          id: event.id,
          name: event.name,
          title: event.eventType,
          pickupDate: event.pickupDate,
          imageUrl: event.imageUrl,
          averageRating: event.feedbacks?.[0]?.averageRating ?? 0,
          createdAt: event.feedbacks?.[0]?.createdAt ?? "",
          slug: event.slug,
          eventType: event.eventType,
          clientName: event.clientName,
          phoneNumber: event.phoneNumber,
          location: event.location,
          pickupLocation: event.pickupLocation,
          dropOffLocation: event.dropOffLocation,
          vehicle: event.vehicle,
          totalAmount: event.totalAmount,
          passengerCount: event.passengerCount,
          pendingAmount: event.pendingAmount,
          depositAmount: event.depositAmount,
          hoursReserved: event.hoursReserved,
          equityDivision: event.equityDivision,
          eventStatus: event.eventStatus,
          paymentStatus: event.paymentStatus,
          updatedAt: event.updatedAt,
          expiresAt: event.expiresAt,
          host: event.host,
          cohosts: event.cohosts,
          feedbacks: event.feedbacks,
        }));

        setFilteredEvents(mappedFilteredEvents);
      } else {
        setFilteredEvents([]);
      }
    } catch (error) {
      console.error("Error fetching filtered events:", error);
    }
  };

  const handleViewDetails = (event: Event) => {
    setSelectedEventSlug(event.slug);
    setSelectedEventId(event.id);
  };
  const handlebackk = () => {
    setSelectedEventSlug(null);
    setSelectedEventId("");
    setActiveView("Feedback");
  };

  if (role === "user") {
    if (selectedEventSlug !== null) {
      return (
        <AddFeedback
          eventId={selectedEventSlug}
          setActiveView={setActiveView}
          setSelectedEventId={setSelectedEventId}
          setSelectedEventSlug={setSelectedEventSlug}
        />
      );
    }
  } else {
    if (selectedEventSlug !== null) {
      return <FeedbackDetailsPage onBack={handlebackk} event={data?.event} />;
    }
  }

  return (
    <>
      <PageHeader
        onBack={() => setActiveView("Dashboard")}
        title="Add Event FeedBack"
      />
      <SearchFilters onSearch={handleSearch} />
      {isLoading && (
        <div className="mt-8 text-center text-blue-600 font-semibold">
          Loading events...
        </div>
      )}

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
        {hasSearched ? (
          filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                title={event.name}
                date={event.pickupDate}
                imageUrl={event.imageUrl}
                averageRating={event?.feedbacks?.[0]?.averageRating}
                createdAt={event?.createdAt}
                onViewDetails={() => handleViewDetails(event)}
                Label={role === "user" ? "Add Your Feedback" : "View Details"}
              />
            ))
          ) : (
            <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <h1 className="text-black text-xl text-center sm:text-xl md:text-xl">
                Result not found
              </h1>
            </div>
          )
        ) : (
          events?.map((event) => (
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
          ))
        )}
      </div>
    </>
  );
}
