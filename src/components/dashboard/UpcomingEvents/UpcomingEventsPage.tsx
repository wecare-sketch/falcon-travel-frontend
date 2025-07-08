import { useState } from "react";
import { PageHeader } from "../PageHeader";
import { EventCard } from "./EventCard";
import { SearchFilters } from "../SearchFilter";
import { CreateEventCard } from "./CreateEventCard";
import { EventDetailsPage } from "../EventDetails/EventDetailPage";

const events = [
  {
    id: 1,
    title: "Annual Corporate Gala",
    date: "Dec 15, 2023",
    imageUrl: "/images/Clip path group.png?height=212&width=288",
  },
  {
    id: 2,
    title: "Annual Corporate Gala",
    date: "Dec 15, 2023",
    imageUrl: "/images/Clip path group.png?height=212&width=288",
  },
];

interface UpcomingEventsPageProps {
  setIsCreateModalOpen: (isOpen: boolean) => void;
}

export function UpcomingEventsPage({
  setIsCreateModalOpen,
}: Readonly<UpcomingEventsPageProps>) {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const handleViewDetails = (eventId: number) => {
    setSelectedEventId(eventId);
  };

  const handleCreateEvent = () => {
    setIsCreateModalOpen(true);
  };

  if (selectedEventId !== null) {
    return <EventDetailsPage eventId={selectedEventId} />;
  }

  return (
    <div>
      <PageHeader title="List of Events" />
      <SearchFilters />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            date={event.date}
            imageUrl={event.imageUrl}
            onViewDetails={() => handleViewDetails(event.id)}
          />
        ))}
        <CreateEventCard onCreateEvent={handleCreateEvent} />
      </div>
    </div>
  );
}
